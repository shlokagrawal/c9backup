var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/fallinlovewith/:thing",function(req,res){
   var thing=req.params.thing;
   res.render("love",{thingVar:thing});
});

app.get("/posts",function(req, res) {
    var post=[{title:"The Monk Who Sold His Ferrari", author:"Robin Sharma"},{title:"Five Point Something",author:"Chetan Bhagat"},{title:"Corporate Chanakya",author:"RadhaKrishnan Pilai"}];
    res.render("posts",{post:post});
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Has Started!!!");
});