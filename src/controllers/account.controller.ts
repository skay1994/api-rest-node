import { Request, Response, Router, NextFunction } from 'express'
import { celebrate } from 'celebrate'

import Controller from './base.controller'
import accountModel from '../models/account.model'

import AccountListSchema from '../formSchemas/accounts/list.schema'
import AccountAddAmountSchema from '../formSchemas/accounts/add_amount.schema'

class AccountController extends Controller {
    public routers(): Router {
        this.router.post('/', celebrate(AccountListSchema), this.get)
        this.router.post('/add', celebrate(AccountAddAmountSchema), this.addAmount)

        return this.router
    }

    private get(request: Request, response: Response) {
        /*  #swagger.tags = ['Account']
        #swagger.description = 'List user by id' */
        accountModel.find({ user_id: request.body.user_id }, (err: any, account: any) => {
            if (account) {
                response.send({ success: true, account: account });
            } else {
                response.status(404).send({ success: false, error: 'Account not found' })
            }
        })
    }

    private addAmount(request: Request, response: Response) {
        /*  #swagger.tags = ['Account']
        #swagger.description = 'Add amount to account' */
        accountModel.updateOne({ user_id: request.body.user_id }, { $inc: { current_balance: request.body.amount } }, (err: any) => {
            if (err) {
                response.status(404).send({ success: false, error: 'Error on add value to balance' });
            }

            response.send({ success: true, message: "Amount added with successful to accont balance" });
        })
    }
}

export default AccountController