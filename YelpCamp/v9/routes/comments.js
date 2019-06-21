//routes for comments

var express = require("express");

var router = express.Router({mergeParams: true});//we have wriiten {mergeParams: true} because we are writing app.use("/campgrounds/:id/comments",commentRoutes); in app.js and were not able to get id of the campground so by writing this statement we were able to gather the id in this file. refer lecture 343 and section 36.
var Campground = require("../models/campground");
var Comment    = require("../models/comment");

//comments new
router.get("/new",isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){console.log(err);}
        else{
            res.render("comments/new",{campground:campground});        
        }
    });
    
});

//comments create
router.post("/",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
               if(err){console.log(err);} 
               else{
                   //add username and id to the comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+campground._id);
               }
            });
            
        }
    });
});

//middleware function
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;