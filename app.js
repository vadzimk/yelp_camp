var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//data:
var campgrounds = [
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"},
    {name: "Cranite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Scout camp", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f4c77ca5eebdbd_340.jpg"},{name: "Salmon Creek", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"},
    {name: "Cranite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Scout camp", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f4c77ca5eebdbd_340.jpg"}

];

app.listen(8080, function () {
    console.log("server has started");
});
//first route
app.get("/", function (req, res) {
    res.render("landing.ejs");
});

app.get("/campgrounds", function (req, res) {


    res.render("campgrounds.ejs", {campgrounds: campgrounds});
});

app.post("/campgrounds",function (req, res) {
    //get data from the form and add to the array and redirect to campgrounds get page
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };

    campgrounds.push(newCampground);

    //redirect back to the campgrounds get route
    res.redirect("/campgrounds");//by default redirects with get request
});

app.get("/campgrounds/new", function (req, res) {
    //render a form
    res.render("new.ejs");
});

