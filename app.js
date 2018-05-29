// Load express
var express = require("express");
var app = express();

// Setup mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful_blogapp");

// Setup method override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

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
    Blog.create(req.body.blog, (err, blog) => {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
})

// NEW route
app.get("/blogs/new", (req, res) => {
    res.render("new");
})

// SHOW route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: blog});
        }
    })
})

// EDIT route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: blog});
        }
    })
})

// UPDATE route
app.put("/blogs/:id", (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
        if(err) {
            res.redirect("/blogs/" + req.params.id);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// Start the server
app.listen(8080, () => {
    console.log("Server has started");
});