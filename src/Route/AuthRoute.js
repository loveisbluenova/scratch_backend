const express = require("express");
const { body } = require("express-validator");
const { loginUser, userLogout, mailSend, otpVerify, resetPassword } = require("../Controller/loginController");
const Auth = require("../middleware/auth");
// # new route generate
const AuthRoute = express.Router();


AuthRoute.post('/login', [body("userName", "Please enter a valid userName.").notEmpty(),
body("password", "Password must be at least 6 character.").isLength({ min: 6 })
],loginUser)


// logout  api
AuthRoute.post('/logout',Auth, userLogout)

// mail send in forget password
AuthRoute.post("/mailsend",[body("email", "Please enter a valid email.").isEmail()],mailSend)

// otp verify
AuthRoute.post("/verify",[body("email", "Please enter a valid email.").isEmail(),body("otp","OTP must be at least 4 characters.").isLength({min:4})],otpVerify)

// reset password api
AuthRoute.put("/resetpassword",[body("email", "Please enter a valid email.").isEmail(),body("password","Password must be at least 6 character.").isLength({min:6})],resetPassword)

module.exports = AuthRoute