// Load express
var express = require("express");
var app = express();

// Setup mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful_blogapp");

// Setup method override for using PUT and DELETE HTML method types
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Other settings to be used by the app
app.set("view engine", "ejs"); // No longer require ejs extension for the partials
app.use(express.static("public")); // point to the common assets folder
app.use(express.urlencoded({extended: true})); // body-parser for putting post data into req.body

// Text Sanitizer (to allow sanitizing of user input data)
var expressSanitizer = require("express-sanitizer");
app.use(expressSanitizer()); // This must be after body-parser

// Import models
var Blog = require("./models/Blog");

// Redirect home to index page
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// RESTful routes
// INDEX route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// CREATE 
app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, blog) => {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// NEW route
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// SHOW route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: blog});
        }
    });
});

// EDIT route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: blog});
        }
    });
});

// UPDATE route
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
        if(err) {
            res.redirect("/blogs/" + req.params.id);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE route
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
});

// Start the server
app.listen(8080, () => {
    console.log("Server has started");
});