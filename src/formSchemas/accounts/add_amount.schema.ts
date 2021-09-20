import { Joi, Segments } from 'celebrate'

export default {
    [Segments.BODY]: Joi.object().keys({
        user_id: Joi.string().max(24).required(),
        amount: Joi.number().required()
    })
}