// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");

//or we can do like this

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name : String,
    image: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
//         name: "Granite Hill", 
//         image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
// },function(err,campground){
//     if(err)
//     {console.log(err);}
//     else
//     {console.log("Newly Created Campground");
//         console.log(campground);
//     }
// });//hardcodly created for testing purpose 

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"},
//         {name: "Granite Hill", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"},
//         {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2240&q=80"},
//         {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"},
//         {name: "Granite Hill", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"},
//         {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2240&q=80"},
//         {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"},
//         {name: "Granite Hill", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"},
//         {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2240&q=80"}
//     ];
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //get all campgrounds from DB.
    Campground.find({},function(err,campgrounds){
        if(err)
        console.log(err);
        else{
            console.log("all campgrounds from database");
            res.render("campgrounds",{campgrounds:campgrounds});
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});//this statement was used for accesing array which we have commented.
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    // campgrounds.push(newCampground); this was used for our hardcoded array now we are using database so we dont need it anymore.
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect("/campgrounds");        
        }
    });
    
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp V1 Server Has Started!!");
});