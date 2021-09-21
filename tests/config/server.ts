const express = require('express');
const { errors } = require('celebrate');

require('dotenv').config()

const app = express();

const routers = require('./../../src/routes');

app.use(express.json())
app.use(routers)
app.use(errors())

module.exports = app