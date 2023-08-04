const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = async (req,res,next) => {
    try {
        //necesitamos enviar las contraseña encryptada para ello importamos bcrypt 
        // y la encriptamos.
        const { username, password, email } = req.body
        const hashed = await bcrypt.hash(password, 10)
        
        await Users.create({ username, email, password:hashed })
        res.json(hashed)
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = req.body
        const userDb = await Users.findOne({
            where:{
                email:user.email
            }
        })
        if (!userDb) {
             return next({
                status:400,
                errorName:'Invalid credentials',
                error:'incorrect email / password'
             })
            //res.status(400).json({
            //     codigo:'101',
            //     message:'icorrect email / assword'
            // })
        }

        const validPassword = await bcrypt.compare(user.password, userDb.password)

        if (!validPassword) {
            return next({
                status:400,
                errorName:'Invalid credentials',
                error:'incorrect email / password'
            //  res.status(400).json({
            //     codigo:'101',
            //     message:'icorrect email / assword'
            })
        }

        const {id, username, email, firstname, lastname, profileImage, validEmail, createdAt, updatedAt  } = userDb
        const token = jwt.sign(
            {  username, email, firstname, lastname  }, 
            process.env.JWT_SECRET,
            { algorithm:'HS512', expiresIn:'10m' })

        res.json({id, username, email, firstname, lastname, profileImage, validEmail, createdAt, updatedAt, token})
    } catch (error) {
        next(error)
    }
}

const allContacts = async (req,res,next) => {
    try {
        const contacts = await Users.findAll()
        res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    loginUser,
    allContacts
}