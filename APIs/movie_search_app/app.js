var express = require("express");
var app = express();

var request = require("request");

app.set("view engine","ejs");

app.get("/",function(req, res) {
   res.render("search");
});

app.get("/results",function(req,res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
   request(url, function (error, response, body){
     if(!error && response.statusCode == 200)
     {
        // var type = typeof body;
        // res.send(type); type of body is string
        //res.send(body);
        var Data = JSON.parse(body);//to convert string into object type.
        // res.send(Data["Search"][0]["Title"]);
        res.render("results",{data:Data});
     }
     else
     console.log("SomeThing Went Wrong!!! :- "+error);
    }); 
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Movie App Has Started!!!");
});