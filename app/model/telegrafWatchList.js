const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    photo : String,
    matn : String
});

module.exports = mongoose.model("telegrafwatchlist", schema)