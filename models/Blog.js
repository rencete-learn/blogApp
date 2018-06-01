var mongoose = require("mongoose");

// Blog Schema
var BlogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
// Blog model
module.exports = mongoose.model("Blog", BlogSchema);