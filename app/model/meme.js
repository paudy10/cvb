const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    photo : String
});

module.exports = mongoose.model("meme", schema)