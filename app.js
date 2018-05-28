// Load express
var express = require("express");
var app = express();

// Setup mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful_blogapp");

// Other settings to be used by the app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// Blog Schema
var BlogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
// Blog model
var Blog = mongoose.model("Blog", BlogSchema);

// Start the server
app.listen(8080, () => {
    console.log("Server has started");
});