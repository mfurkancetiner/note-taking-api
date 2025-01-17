const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/errors-index')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Invalid bearer token')
    }
    const token = authHeader.split(' ')[1]
    
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        //attaches user to note routes
        req.user = { userId: payload.userId,
            username: payload.username,
            email:payload.email
        }
        next()
    }
    catch(error){
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth

