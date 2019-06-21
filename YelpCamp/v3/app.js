var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp_v3",{useNewUrlParser: true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

seedDB();

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
            res.render("index",{campgrounds:campgrounds});
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
   res.render("new"); 
});

app.get("/campgrounds/:id",function(req, res) {
   
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){//see lecture 324,section 33 if you don't understand this line.
      if(err)
      {
          console.log(err);
      }
      else
      {
         res.render("show",{campground : foundCampground}); 
      }
   });
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp V1 Server Has Started!!");
});