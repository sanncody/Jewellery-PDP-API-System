const errorHandlingMiddleware = (err, req, res, next) => {
    // Log error for debugging
    console.error('Error:', err);

    // Handle PostgreSQL database errors
    if (err.code) {
        // Database connection errors
        if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
            return res.status(503).json({
                success: false,
                error: 'Database connection failed. Please try again later.',
                message: 'Service temporarily unavailable'
            });
        }

        // PostgreSQL specific error codes
        switch (err.code) {
            case '23505': // Unique violation
                return res.status(409).json({
                    success: false,
                    error: 'Duplicate entry. This record already exists.',
                    message: err.message
                });
            case '23503': // Foreign key violation
                return res.status(400).json({
                    success: false,
                    error: 'Invalid reference. Related record does not exist.',
                    message: err.message
                });
            case '23502': // Not null violation
                return res.status(400).json({
                    success: false,
                    error: 'Required field is missing.',
                    message: err.message
                });
            case '42P01': // Undefined table
                return res.status(500).json({
                    success: false,
                    error: 'Database configuration error.',
                    message: 'Table does not exist'
                });
            case '42703': // Undefined column
                return res.status(500).json({
                    success: false,
                    error: 'Database configuration error.',
                    message: 'Column does not exist'
                });
            case '42601': // Syntax error
                return res.status(500).json({
                    success: false,
                    error: 'Database query error.',
                    message: 'Invalid SQL syntax'
                });
            default:
                // Other PostgreSQL errors
                return res.status(500).json({
                    success: false,
                    error: 'Database error occurred.',
                    message: err.message
                });
        }
    }

    // Handle generic database errors
    if (err.message && err.message.includes('timeout')) {
        return res.status(504).json({
            success: false,
            error: 'Database request timed out. Please try again.',
            message: 'Gateway timeout'
        });
    }

    // Handle validation errors (if using a validation library)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Validation error',
            message: err.message,
            details: err.errors
        });
    }

    // Default error handler
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandlingMiddleware;