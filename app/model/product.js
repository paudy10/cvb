const mongoose = require("mongoose");

const schema = new mongoose.Schema({

    name: String,
    price: Number,
    exist: Boolean,
    cat: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    }

});

module.exports = mongoose.model("Product", schema)