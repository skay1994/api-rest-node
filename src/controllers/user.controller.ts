import { Request, Response, Router, NextFunction } from 'express'
import bcrypt from 'bcrypt';
import { Joi, Segments, celebrate } from 'celebrate'

import Controller from './base.controller'
import userModel from '../models/user.model'
import accountModel from '../models/account.model'

import UserCreateSchema from '../formSchemas/users/create.schema'
import UserUpdateSchema from '../formSchemas/users/update.schema'

class UserController extends Controller {
    public routers(): Router {
        this.router.get('/', this.getAll)
        this.router.post('/', celebrate(UserCreateSchema), this.createUser)
        this.router.use('/:id', this.IdFormatMiddleware).route('/:id')
            .get(this.getById)
            .put(celebrate(UserUpdateSchema), this.updateUser)
            .delete(this.deleteUser)

        return this.router
    }

    private IdFormatMiddleware(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            id: Joi.string().max(24)
        })
        const { error } = schema.validate({ id: req.params.id })
        if (error && error.details.length) {
            return res.status(404).send({ success: false, error: "Invalid ID formart" })
        }
        next()
    }

    private getAll(req: Request, res: Response) {
        /*  #swagger.tags = ['User']
        #swagger.description = 'List with all users' */
        userModel.find()
            .then((users: any) => {
                res.send({ success: true, users: users });
            })
    }

    private getById(request: Request, response: Response) {
        /*  #swagger.tags = ['User']
        #swagger.description = 'List user by id'
        
        #swagger.parameters['id'] = {
            in: path,
            description: User id,
            required: True,
            type: <string>
        }
        
        */
        userModel.findById(request.params.id, (err: any, user: any) => {
            if (user) {
                response.send({ success: true, users: user });
            } else {
                response.status(404).send({ success: false, error: 'User not found' })
            }
        })
    }

    private createUser = async (request: Request, response: Response) => {
        /*	#swagger.tags = ['User']
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/definitions/CreateUser"
                        }  
                    }
                }
            #swagger.responses[200] = {
                description: User created,
                schema: {
                    $ref: "#/definitions/CreateUser"
                }  
            }
        } */

        const data = request.body;
        if (await userModel.findOne({ email: data.email })) {
            response.status(400).send({
                success: false, error: "Already registered email"
            });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userModel.create({
            ...data,
            current_balance: 0.00,
            password: hashedPassword,
        });

        const account = await accountModel.create({
            user_id: user.id,
            number: Math.floor(Math.random() * 1000),
            current_balance: 0.00,
        })

        user.password = ''
        response.send({ success: true, users: [{ user, account }] });
    }

    private updateUser(request: Request, response: Response) {
        /*	#swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/UpdateUser"
                    }  
                }
            }
            #swagger.responses[200] = {
                description: User Updated,
                schema: {
                    $ref: "#/definitions/CreateUser"
                }  
            }
        } */

        userModel.updateOne({ _id: request.params.id }, request.body, null, (err: any) => {
            if (err) {
                response.send({ success: false, message: "Error updating user!" })
            }

            response.send({ success: true, message: "User updated successfully!" })
        })
    }

    private deleteUser(request: Request, response: Response) {
        userModel.deleteOne({ _id: request.params.id }, (err) => {
            if (err) {
                response.send({ success: false, message: "Error deleting user!" })
            }

            response.send({ success: true, message: "User deleted successfully!" })
        })
    }
}

export default UserController