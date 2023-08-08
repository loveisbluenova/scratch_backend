const scratch = require("../models/animateSchema")

// create scratch function
const addScratch = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const scratchData = new scratch(req.body);
        const response = await scratchData.save();
        console.log('response', response)
        return res.status(201).json({ success: true, message: "Successfully created a new scratch." })
    
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: "Internal server error", success: false })
    }
}

// create scratch function
const getScratch = async (req, res) => {
    try {
        console.log('req.body', req.params);

        if(req.user){
            const response = await scratch.findOne({userId : req.user._id});
            console.log('response', response)
            return res.status(201).json({ success: true, message: "Successfully fetch data.", data:response })
        }
    
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: "Internal server error", success: false })
    }
}

module.exports = {addScratch,getScratch}

