import * as express from 'express';
import Controller from './../interfaces/controller.interface';

abstract class BaseController implements Controller {
    public path = '/';
    public router = express.Router();

    public routes() { }
}

export default BaseController