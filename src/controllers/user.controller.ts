import { Request, Response, Router, NextFunction } from 'express'
import bcrypt from 'bcrypt';
import { Joi, Segments, celebrate } from 'celebrate'

import Controller from './base.controller'
import userModel from '../models/user.model'

import UserCreateSchema from '../formSchemas/users/create.schema'
import UserUpdateSchema from '../formSchemas/users/update.schema'

class UserController extends Controller { }

export default UserController