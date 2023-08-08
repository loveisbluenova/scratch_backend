const express = require("express");
const Auth = require("../middleware/auth");
const { addScratch, getScratch } = require("../Controller/ScratchController");


const scratchRoute = express.Router();

// *******************  scratch create api *************************//
scratchRoute.post('/', Auth, addScratch);


// *******************  scratch get api *************************//
scratchRoute.get('/', Auth, getScratch);

module.exports = scratchRoute;