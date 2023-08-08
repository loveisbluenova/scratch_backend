const express = require("express");
require('dotenv').config();
// # authtication route file path
const AuthRoute = require("./Route/AuthRoute");
// # user route file path
const userRoute = require("./Route/UserRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const scratchRoute = require("./Route/ScratchRoute");
// # import databse file
require("./DB/Conn")

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(bodyParser.json())

// # authtication route path
app.use('/api/auth',AuthRoute)
// # user route path
app.use('/api/user',userRoute)
// # scratch  route path
app.use("/api/scratch",scratchRoute)

// #server listen code
app.listen(process.env.PORT,() => {
    console.log(`Scratch server running in ${process.env.PORT}`)
})