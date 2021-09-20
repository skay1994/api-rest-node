import { Joi, Segments } from 'celebrate'

export default {
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        document: Joi.string().min(12).required(),
        gender: Joi.string().required(),
        birthday: Joi.date().required(),
    })
}