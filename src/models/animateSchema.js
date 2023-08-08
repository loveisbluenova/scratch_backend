const mongoose = require("mongoose");

const scratchSchema = new mongoose.Schema({
    projectTitle: {
        type: String
    },
    Locale: {
        type: String
    },
    isRtl: {
        type: Boolean,
        default:false
    },
    targets: [Object],
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        required :true
    }
});

const Scratch = new mongoose.model("Scratch", scratchSchema);

module.exports = Scratch;
