var mongoose = require("mongoose");

var UserSchmea = new mongoose.Schema({
    username:{
        type: String,
        require: [true,"User must have username"],
        unique: true,
     },
    password: {
       type: String,
       require: [true,"User must have password"]
    }
});
module.exports = mongoose.model("User", UserSchmea);