//this is just a trial app which will not have any designing and all its just for me only for my understanding 
//of RESTfull routes
//yeh app refer karo just for functioning not for designing and all

var bodyParser = require("body-parser"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

var methodOverride = require("method-override");
//connecting database
mongoose.connect("mongodb://localhost/trial_app",{useNewUrlParser: true});

//app configuration
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//creating schema
var trial_app_schema = mongoose.Schema({
   name:String,
   description:String
});

//modelizing schema and creating collection trials
var Trial = mongoose.model("Trial",trial_app_schema);

// Trial.create({
//     name:"shlok",
//     description:"sooon going to be a founder of great company.",
// });

//routes
app.get("/",function(req,res){
   res.redirect("/users"); 
});

app.get("/users",function(req,res){
    Trial.find({},function(err,userfound){
        if(err){console.log(err);}
        else
        {
          res.render("index",{userfound:userfound});   
        }
    });
});

app.get("/users/new",function(req, res) {
    res.render("newuser");
});

app.post("/users",function(req,res){
    Trial.create(req.body.user,function(err,createdUser){
       if(err){console.log(err);}
       else{
           res.redirect("/users");
       }
    });
});

app.get("/users/:id",function(req, res) {
    Trial.findById(req.params.id,function(err,foundUser){
       if(err){console.log(err);} 
       else{
           res.render("showuser",{foundUser:foundUser});
       }
    });
});

app.get("/users/:id/edit",function(req, res) {
   Trial.findById(req.params.id,function(err,editUser){
       if(err){console.log(err);} 
       else{
           res.render("edituser",{editUser:editUser});
       }
    }); 
});

app.put("/users/:id",function(req,res){
    Trial.findByIdAndUpdate(req.params.id,req.body.user,function(err,updatedUser){
       if(err){console.log(err);}
       else
       {
           res.redirect("/users/"+updatedUser._id);
       }
    });
});

app.delete("/users/:id",function(req,res){
    Trial.findByIdAndRemove(req.params.id,function(err,deletedUser){
        if(err){console.log(err);}
        else
        {
            res.redirect("/users");
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Your Trial App Has Started"); 
});