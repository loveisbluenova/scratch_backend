const user = require("../models/userSchema")
const expressValidator = require("express-validator");

// create user function
const createUser = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const errors = expressValidator.validationResult(req)
        console.log('errors', errors)
        // check data validation error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array(), success: false })
        }
        // check email and userName exist or not
        const FindData = await user.findOne({ email: req.body.email,userName : req.body.userName })
        console.log(FindData, "====> FindData")

        if (FindData) {
            return res.status(400).json({ message: "email address or user name already exists.", success: false })
        } else {
            req.body.createDate = Date.now()
            const userData = new user(req.body);
            const response = await userData.save();
            console.log('response', response)
            return res.status(201).json({ success: true, message: "Successfully created a new user." })
        }
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: "Internal server error", success: false })
    }
}

// check Email function
const checkEmail = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req)
        console.log('errors', errors)
        // check data validation error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array(), success: false })
        }

        // check email exist or not
        const data = await user.findOne({ email: req.body.email })
        console.log(data, "====> check email")

        if (data) {
            return res.status(400).json({ message: "Email address already exists.", success: false })
        } else {
            return res.status(200).json({ success: true, message: "Email address not exists." })
        }
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: "Internal server error", success: false })
    }
}

// userName function
const checkUserName = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req)
        console.log('errors', errors)
        // check data validation error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array(), success: false })
        }

        // check email exist or not
        const data = await user.findOne({ "userName":{$regex: new RegExp('^' + req.body.userName, 'i')}})
        console.log(data, "====> check userName")

        if (data) {
            return res.status(400).json({ message: "Username taken. Try another?", success: false })
        } else {
            return res.status(200).json({ success: true, message: "Username is valid." })
        }
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: "Internal server error", success: false })
    }
}

// single user data fetch function
const activeUser = async (req, res) => {
    try {
        console.log('req.params', req.params)
        if (req.user) {
            const userData = await user.findOne({ _id: req.params.id }).select("-password");
            console.log('userData', userData)
            if (userData) {
                return res.status(200).json({ success: true, message: "User data fetch successfully.", data: userData })
            } else {
                return res.status(404).json({ success: false, message: "User is not found" })
            }
        }
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: "Internal server error", success: false })
    }
}

module.exports ={createUser,checkUserName,checkEmail,activeUser}