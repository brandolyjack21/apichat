const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.status(400).json({
            message:'no token provided'
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET,{
        algorithms:'HS512'
    })
    req.Users = decoded
    next()
    } catch (error) {
        next({
            status: 400,
            errorName:'invalid token',
            error,
        })
        // res.status(400).json(error)
    }
}

module.exports = authenticate