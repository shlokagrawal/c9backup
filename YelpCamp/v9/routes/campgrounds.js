//routes for campgrounds.
//we will add router we will not do this var express = require("express"), var app = express();
//we will do new thing which is router.
var express = require("express");

var router = express.Router();
var Campground = require("../models/campground");
//now replace app with the route


//index route- show all campgrounds.
router.get("/",function(req,res){
    //get all campgrounds from DB.
    Campground.find({},function(err,campgrounds){
        if(err)
        console.log(err);
        else{
            console.log("all campgrounds from database");
            res.render("campgrounds/index",{campgrounds:campgrounds, currentUser:req.user});
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});//this statement was used for accesing array which we have commented.
});

//create route-add new campground to db
router.post("/",isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {id:req.user._id, username:req.user.username}
    var newCampground = {name:name, image:image, description:desc, author:author};
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

//new route - show form to create new route
router.get("/new",isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

//show route - show more info about one campground.
router.get("/:id",function(req, res) {
   
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){//see lecture 324,section 33 if you don't understand this line.
      if(err)
      {
          console.log(err);
      }
      else
      {
         res.render("campgrounds/show",{campground : foundCampground}); 
      }
   });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;