const expressValidator = require("express-validator");
const user = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const sendMail = require("../Handler/SendMail");

// login function
const loginUser = async(req, res) => {
    try {
        console.log('req.body', req.body)
        const errors = expressValidator.validationResult(req)
        console.log('errors', errors)
        // check data validation error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array(), success: false })
        }

        // check email exist or not
        const data = await user.findOne({ "userName": req.body.userName})
        console.log(data, "====> check userName")

        if (data) {
            // compare password
            let isMatch = await bcryptjs.compare(req.body.password, data.password);
            
             if(isMatch){
                 const token = await data.generateToken();
                 
                 return res.status(200).json({ success: true, message: "Login successfully.", token: token, id: data._id })
                }else{
                 return res.status(404).json({ success: false, message: "Invalid user name or password." })
             }
        } else {
            return res.status(404).json({ success: false, message: "Invalid user name or password." })
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send("internal server")
    }
}

// logout  function
const userLogout = async (req, res) => {
    try {
        req.user.token = null

        if (req.user) {
            await req.user.save();
            return res.status(200).json({ success: true, message: "Logout is successfully." })
        } else {
            return res.status(404).json({ success: false, message: "Logout is faied." })
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

// forget password send mail
const mailSend = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);
        // check data validation error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array(), success: false })
        }

        // email check exist or not
        const userData = await user.findOne({ email: req.body.email })

        if (userData) {
            // generate token
            let mailsubject = 'Mail Verification';
            let otp = Math.random().toString().slice(3, 7);
            otp.length < 4 ? otp = otp.padEnd(4,"0") : otp;
            // mail content
            let content = `<h4><b>D9ithub</b></h4> \
                        <hr/> \
                        <p>hi</p>\
                  <p>Thank you for choosing Your Brand. Use the following OTP to complete your email verify procedures. and before reset password  page for display.
                  : <b> ${otp} </b> </p>
                `
            // mail send function
            sendMail(req.body.email, mailsubject, content);

            console.log('otp', otp)
            userData.otp = otp;
            const response =  await userData.save()
            // update data for otp
            // const response = await user.findByIdAndUpdate({ _id: userData._id }, { otp }, { new: true })
            return res.status(200).json({ success: true, message: "OTP sent successfully.",data:response.email });
        } else {
            // email not match send message
            return res.status(400).json({ message: "Email address not found.", success: false })
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

// verify otp funcation
const otpVerify = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);
        // check data validation error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array(), success: false })
        }

        // email check exist or not
        const userData = await user.findOne({ email: req.body.email })

        if (userData.otp == req.body.otp) {
            userData.otp = null;
            const response =  await userData.save()
            // update data for otp
            // const response = await user.findByIdAndUpdate({ _id: userData._id }, { otp }, { new: true })
            return res.status(200).json({ success: true, message: "OTP verified successfully." });
        } else {
            // email not match send message
            return res.status(400).json({ message: "Invalid OTP.Please try again.", success: false })
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

 // reset password function
const resetPassword = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);
        // check data validation error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array(), success: false })
        }

        // email check exist or not
        const userData = await user.findOne({ email: req.body.email })

        if (userData) {
            // password convert hash
            let passwordHash = await bcryptjs.hash(req.body.password, 10)
            const response = await user.findByIdAndUpdate({ _id: userData._id }, { password: passwordHash,updateDate: Date.now()}, { new: true })
            return res.status(200).json({ success: true, message: "Your password has been changed successfully." })
        } else {
            return res.status(404).json({ success: false, message: "Your password has been changed failed." })
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

module.exports = {loginUser,userLogout,mailSend,otpVerify,resetPassword}