import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../../app';
import createConnection from '../../database/connect';

describe('User Test', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to create a new user', async () => {
        const userData = {
            name: 'Carlos Felipe',
            email: 'carlos@teste.com',
            password: 'teste123',
        };

        const response = await request(app)
            .post('/v1/users')
            .send({
                ...userData,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('email');
    }),
        it('should authenticate with valid credentials', async () => {
            const userData = {
                email: 'carlos@teste.com',
                password: 'teste123',
            };

            const response = await request(app)
                .post('/v1/users/auth')
                .send({
                    ...userData,
                });

            expect(response.status).toBe(200);
        }),
        it('should not authenticate with invalid credentials', async () => {
            const userData = {
                email: 'carlos@teste.com',
                password: 'teste102',
            };

            const response = await request(app)
                .post('/v1/users/auth')
                .send({
                    ...userData,
                });

            expect(response.status).toBe(400);
        }),
        it('should return jwt token when authenticated', async () => {
            const userData = {
                email: 'carlos@teste.com',
                password: 'teste123',
            };

            const response = await request(app)
                .post('/v1/users/auth')
                .send({
                    ...userData,
                });

            expect(response.body).toHaveProperty('token');
        });

});
