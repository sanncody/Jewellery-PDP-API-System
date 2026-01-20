const dotenv = require('dotenv');
dotenv.config();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const pg = require('./src/config/db.js');
const app = require('./src/app');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Jewellery PDP Backend API System',
            description: 'API documentation for Jewellery Product Detail Page Backend System. This API provides endpoints for managing products, metals, diamonds, pricing calculations, and inventory availability.',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Development server"
            }
        ],
        tags: [
            {
                name: 'Products',
                description: 'Product management endpoints'
            },
            {
                name: 'Diamonds',
                description: 'Diamond information endpoints'
            },
            {
                name: 'Metals',
                description: 'Metal information endpoints'
            }
        ]
    },
    apis: ['./src/routes/product.routes.js', './src/routes/metal.routes.js', './src/routes/diamond.routes.js']
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 *  @swagger
 *  /:
 *  get:
 *      summary: This API is used to test DB connection
 *      description: This API is used to test DB connection
 *      responses:
 *          200:
 *              description: To test DB connection
 */


/* Testing Connection */
app.get('/', async (req, res) => {
    const result = await pg.query("SELECT CURRENT_DATABASE()");
    res.send(result.rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});