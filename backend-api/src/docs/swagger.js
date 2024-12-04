const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Web Blog App API',
            version: '1.0.0',
            description: 'A simple Web Blog app API',
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Development server',
        }, ],
    },
    apis: ['./src/routes/*.js', './src/docs/components.yaml'],
};
const specs = swaggerJsdoc(options);
module.exports = {
    specs,
    swaggerUi,
};