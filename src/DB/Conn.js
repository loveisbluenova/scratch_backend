const mongoose = require("mongoose");

// # connect in mongoose
mongoose.connect("mongodb://localhost:27017/scratch_database").then(() => console.log("Database connect successfully.")).catch((e) => console.log('e', e))