import { Express } from 'express';

const router = require('express').Router()
const users = require('./users')

router.use('api/users', users);

module.exports = router