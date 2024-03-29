//routes for comments

var express = require("express");

var router = express.Router({mergeParams: true});//we have wriiten {mergeParams: true} because we are writing app.use("/campgrounds/:id/comments",commentRoutes); in app.js and were not able to get id of the campground so by writing this statement we were able to gather the id in this file. refer lecture 343 and section 36.
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware")

//comments new
router.get("/new",middleware.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){console.log(err);}
        else{
            res.render("comments/new",{campground:campground});        
        }
    });
    
});

//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
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

//comments edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id: req.params.id,comment: foundComment});          
        }
    });
   
});


//comments update route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComments){
     if(err){
         res.redirect("back");
     }else{
         res.redirect("/campgrounds/"+req.params.id)
     }  
   });
});

//comment destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
     if(err){
         res.redirect("back");
     } else{
         res.redirect("/campgrounds/" + req.params.id);
     }
  });
});


//middleware function
// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

// function checkCommentOwnership(req,res,next){
//     if(req.isAuthenticated()){
//           Comment.findById(req.params.comment_id,function(err,foundComment){
//           if(err){res.redirect("back");}
//           else
//           {
//               //does user own the comment?
//               if(foundComment.author.id.equals(req.user._id)){
//                     next();    
//               }else{
//                   res.redirect("back");
//               }
               
//           }
//       });
//   }else{
//           //if not redirect
//          // res.send("you need to be logged in to do that!");
//          res.redirect("back");
//   }
// }

module.exports = router;