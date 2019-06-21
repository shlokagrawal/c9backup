var express = require("express");
var app = express();
var bodyParser = require("body-parser");//this package is installed to get the value of input in forms for post method.

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/",function(req,res){
    res.render("home");
});

app.post("/addfriend",function(req,res){
    friends.push(req.body.friendname);
    //res.send("Yahh! you have made a new friend!");
    res.redirect("/friends");//this method will redirect to friends page and frieds will get reexecuted once.
});

app.get("/friends",function(req,res){
   res.render("friends",{friends:friends}); 
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server Has Started!!!"); 
});