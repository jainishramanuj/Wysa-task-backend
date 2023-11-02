const joi = require("joi");

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    })
    return schema.validate(data);
}

module.exports = validate;