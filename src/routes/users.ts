import { Request, Response } from 'express';
var router = require('express').Router();

router.get('/', function (req: Request, res: Response) {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'List with all users' */
    res.send("All Users")
})
router.post('/', function (req: Request, res: Response) {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Create a new user'
        #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/User" },
            description: "User registered successfully."
        }
    */
})
router.route('/:id').get(function (req: Request, res: Response) {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Get a specific user'
        #swagger.parameters['id'] = { description: 'User ID' }
    */
}).put(function (req: Request, res: Response) {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Update a specific user'
        #swagger.parameters['id'] = { description: 'User ID' }
    */
}).delete(function (req: Request, res: Response) {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Delete a specific user'
        #swagger.parameters['id'] = { description: 'User ID' }
    */
})

module.exports = router;