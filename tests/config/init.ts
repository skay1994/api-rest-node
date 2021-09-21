import supertest from "supertest"
import express from 'express';
import { errors } from 'celebrate';

require('dotenv').config()

const app = express();

const routers = require('./../../src/routes');

app.use(express.json())
app.use(routers)
app.use(errors())

export default supertest(app)