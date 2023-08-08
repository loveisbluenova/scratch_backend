const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    token:{
        type: String
    },
    otp: {
        type: Number
    },
    createDate: {
        type: Date,
    },
    deleteDate: {
        type: Date,
    },
    updateDate: {
        type: Date
    },
})


// generate token
userSchema.methods.generateToken = async function () {
    try {
        console.log('this._id :>> ', this._id);
        var token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        console.log('token :>> ', token);
        this.token = token
        console.log('this.Tokens :>> ', this.Tokens);
        await this.save();
        return token

    } catch (error) {
        console.log('error :>> ', error);
    }
}

// password convert
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log('this.password', this.password)
        this.password = await bcrypt.hash(this.password, 10)
        // console.log('this.password', this.password)
    }
    next()
})

// # create collection
const user = new mongoose.model("user",userSchema);

module.exports = user;