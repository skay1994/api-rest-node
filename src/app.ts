import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import { AppError } from './config/error/AppError';
import { routes } from './routes';
import createConnection from '../src/database/connect';

createConnection();

import swaggerDocs from './swagger.json';
import swagger from 'swagger-ui-express';

const app = express();

app.use(express.json());

app.use('/v1', routes);
app.use('/documentacion', swagger.serve, swagger.setup(swaggerDocs));
app.use(errors());

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

export default app;
