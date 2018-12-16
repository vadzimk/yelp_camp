var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//connect to the database:
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

//######  Set up Schema   ######
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salmon Creek",
//         image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg",
//         description: "this is a huge one, no bathrooms, no water"
//     }, function (err, campground) {
//         if(err){
//             console.log(err);
//         } else {
//             console.log(campground + "has been created");
//         }
// });

//######  End Schema      ######

//data:
// var campgrounds = [
//     {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"},
//     {name: "Cranite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
//     {name: "Scout camp", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f4c77ca5eebdbd_340.jpg"},{name: "Salmon Creek", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"},
//     {name: "Cranite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
//     {name: "Scout camp", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f4c77ca5eebdbd_340.jpg"}
//
// ];

app.listen(8080, function () {
    console.log("server has started");
});
//first route
app.get("/", function (req, res) {
    res.render("landing.ejs");
});

//INDEX route - show all campgrounds
app.get("/campgrounds", function (req, res) {

    //get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("index.ejs", {campgrounds: allCampgrounds});
        }
    });

});

//CREATE - add new campground to db
app.post("/campgrounds",function (req, res) {
    //get data from the form and add to the array and redirect to campgrounds get page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    //Create a new campground and save to the database
    Campground.create(newCampground, function (err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            //redirect back to the campgrounds get route
            res.redirect("/campgrounds");//by default redirects with get request
        }
    });


});

//NEW - show form to create campground
app.get("/campgrounds/new", function (req, res) {
    //render a form
    res.render("new.ejs");
});

//SHOW route- shows more info about one campground
//as soon as it uses a pattern with colon,
//you need to be carefull with presidence and list it at the bottom
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs", {campground: foundCampground});
        }
    });


});

