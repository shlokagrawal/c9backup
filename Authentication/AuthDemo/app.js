var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStratergy        = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
    
mongoose.connect("mongodb://localhost/auth_demo_app",{useNewUrlParser: true});

var app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret: "Rusty is the best and the cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());//1
passport.deserializeUser(User.deserializeUser());//2 by adding this 1st and 2nd method, inside our user.js by adding passportLocalMongoose we have added this method automatically through this 1 and 2 methods.
//refer lecture 334 section 34 for better understanding.

//ROUTES
app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});

//Auth routes
//show sign up form
app.get("/register",function(req, res) {
   res.render("register"); 
});

//handling user sign up or register
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
       if(err){
           console.log(err);
           return res.render("register");
       } 
       else{
           passport.authenticate("local")(req,res,function(){
               res.redirect("/secret");
           });
       }
    });
});

//LOGIN Routes
app.get("/login",function(req, res) {
   res.render("login"); 
});


//middleware-the authenticate function which we are writing in the middle of post and callback function is called middleware. it executes immediately after the app.post() called that's why it is called middleware.
app.post("/login",passport.authenticate("local",
{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res) {
   
});


//LOGOUT Routes
app.get("/logout",function(req, res) {
   req.logout();
   res.redirect("/");
});


//middleware function
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Authentication Server Started..."); 
});