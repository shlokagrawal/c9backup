//routes for authentication and others.

var express = require("express");

var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

//root ROUTES
router.get("/",function(req,res){
    res.render("landing");
});



//show register form
router.get("/register",function(req, res) {
    res.render("register", {page: 'register'});
});

//handle register logic
router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err,user){
       if(err){
         //console.log(err);
        return res.render("register", {error: err.message});
                }
       else{
           passport.authenticate("local")(req,res,function(){
               req.flash("success","Welcome To YelpCamp "+user.username)
               res.redirect("/campgrounds");
           });
       }
    });
});

//show login form
router.get("/login",function(req, res) {
   res.render("login", {page: 'login'}); 
});

//handle login logic
//passport.authenticate() is a middleware.
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res) {
});


//logout route
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/campgrounds");
});

//middleware function
// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }



module.exports = router;