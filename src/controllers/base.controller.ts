import * as express from 'express';
import Controller from './../interfaces/controller.interface';

abstract class BaseController implements Controller {
    public path = '/';
    public router = express.Router();

    protected routes() { }

    public getRoutes(): express.Router {
        this.routes();
        return this.router
    }
}

export default BaseController