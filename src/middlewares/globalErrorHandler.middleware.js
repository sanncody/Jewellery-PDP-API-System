const globalErrorHandler = (err, req, res, next) => {
    console.error(err);

    // PostgreSQL errors
    if (err.code) {
        return res.status(400).json({
            success: false,
            message: 'Database operation failed'
        });
    }

    // Custom errors
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Fallback
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
};

module.exports = globalErrorHandler;
