var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStratergy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp_v6",{useNewUrlParser: true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//our own middleware any function will provide to it will work on every route refer lecture 342 and scetion 35 for understanding
app.use(function(req,res,next){
    // res.locals.currentUser it will be send to every ejs templates we not have to manually add this currentUser:req.user to every ejs template  .
    res.locals.currentUser = req.user;
    next();
});

//ROUTES
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
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});//this statement was used for accesing array which we have commented.
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
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
   res.render("campgrounds/new"); 
});

app.get("/campgrounds/:id",function(req, res) {
   
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

//=============================
// COMMENTS ROUTES
//=============================
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){console.log(err);}
        else{
            res.render("comments/new",{campground:campground});        
        }
    });
    
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
               if(err){console.log(err);} 
               else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+campground._id);
               }
            });
            
        }
    });
});

//AUTH ROUTES

//show register form
app.get("/register",function(req, res) {
    res.render("register");
});

//handle register logic
app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err,user){
       if(err){
           console.log(err);
           return res.render("register");
       } 
       else{
           passport.authenticate("local")(req,res,function(){
               res.redirect("/campgrounds");
           });
       }
    });
});

//show login form
app.get("/login",function(req, res) {
   res.render("login"); 
});

//handle login logic
//passport.authenticate() is a middleware.
app.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res) {
   
});


//logout route
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

//middleware function
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp V1 Server Has Started!!");
});