const express = require("express")
const expressValidator = require("express-validator");
// user controller file path
const { createUser, checkEmail, checkUserName, activeUser } = require("../Controller/userController");
const Auth = require("../middleware/auth");
// # new route generate
const userRoute = express.Router();

// # user create api
userRoute.post('/',[
    expressValidator.body('email', "Enter a valid email.").isEmail(),
    expressValidator.body('userName', "Enter a valid userName.").notEmpty(),
    expressValidator.body("phone", "phone number must be at least 10 character").isLength({ min: 10 }),
    expressValidator.body("password", "Password must be at least 6 character.").isLength({ min: 6 }),
    expressValidator.body('gender', "Please Enter your gender.").notEmpty(),
    expressValidator.body('dateOfBirth', "Please Enter your dateOfBirth.").notEmpty(),
    expressValidator.body('country', "Please Enter your country.").notEmpty()
], createUser)

// # check email api
userRoute.post('/checkemail', [expressValidator.body('email', "Enter a valid email.").isEmail()], checkEmail)

// # check user name api
userRoute.post('/checkuserName', [expressValidator.body('userName', "username is required.").notEmpty()], checkUserName)

// active user get api
userRoute.get('/:id', Auth, activeUser);

module.exports = userRoute