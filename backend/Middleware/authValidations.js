const Joi = require('joi');

const signupValidation=(req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(15).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
        })
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: "Bad request", error})
    }
    next();
}

const loginValidation=(req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(15).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
        })
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: "Bad request", error})
    }
    next();
}

module.exports ={
    signupValidation,
    loginValidation
}