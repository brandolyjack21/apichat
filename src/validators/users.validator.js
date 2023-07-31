const { check, validationResult } = require('express-validator')
const validateResult = require('../middleware/validate.middleware')

const loginUserValidation = [
    //verificar cada una de las propiedades del req
    check('email', 'Error con el correco electronico')
    .exists()
    .notEmpty()
    .isString()
    ,check('password', 'Error con el password')
    .exists()
    .notEmpty()
    .isString()
    ,validateResult
]

const registerUserValidator = [
    check('username', 'error con username')
    .exists()
    .withMessage('falta el campo de usuario')
    .notEmpty()
    .withMessage('no debe estar vacio')
    .isString()
    .withMessage('debe ser un string')
    .isLength({ max:30, min:3}),
    check('email', 'error con el email')
    .exists()
    .withMessage('falta el correo')
    .notEmpty()
    .withMessage('no puede venir vacio')
    .isString()
    .withMessage('debe ser un string')
    .isEmail()
    .withMessage('no es un email')
    .isLength({ min:6, max:50 })
    .withMessage('el minimo es de 6 caracteres y maximo de 50'),
    check('password', 'error con el password')
    .exists()
    .withMessage('falta el campo de contraseña')
    .notEmpty()
    .withMessage('la contraseña no deve estar vacia')
    .isString()
    .withMessage('la contraseña debe ser un string')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    .withMessage('la contraseña debe tener minimo 8 caracteres, mas una mayuscula, una minuscula,un numero y un caracter especial'),
    validateResult

]

module.exports = {
    loginUserValidation,
    registerUserValidator
}