import { Express } from 'express';
import UserController from './../controllers/user.controller'
import AccountController from './../controllers/account.controller'

const router = require('express').Router()

router.use('/api/users', new UserController().routers());
router.use('/api/accounts', new AccountController().routers());

module.exports = router