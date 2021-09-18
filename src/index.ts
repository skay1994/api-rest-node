import express from 'express';

require('dotenv').config()

require('./database');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json');

const routers = require('./routes');

app.use(routers)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.APP_PORT, () => {
    console.log(`The application is listening on port ${process.env.APP_PORT}!`);
})