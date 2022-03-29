const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    id:Number,
    name: String,
    username : String,
    vip : Number
});

module.exports = mongoose.model("user", schema)