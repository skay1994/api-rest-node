import { Joi, Segments } from 'celebrate'

export default {
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(10).required(),
        password_confirm: Joi.string().min(10).required().valid(Joi.ref('password')),
        document: Joi.string().min(12).required(),
        gender: Joi.string().required(),
        birthday: Joi.date().required(),
    })
}