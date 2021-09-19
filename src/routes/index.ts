import { Express } from 'express';
import UserController from './../controllers/user.controller'

const router = require('express').Router()

router.use('/api/users', new UserController().routers());

module.exports = router