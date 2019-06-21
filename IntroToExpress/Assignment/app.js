var express = require("express");
var app = express();

//#ROUTING
app.get("/",function(req,res)
{
    res.send("Hii There, Welecome To My Assignment!");
});

app.get("/speak/:animal",function(req,res)
{
//   if(req.params.animal=="pig")
//         res.send("The Pig Says 'Oink' ");
//   if(req.params.animal=="cow")
//         res.send("The cow Says 'Moo' ");
//   if(req.params.animal=="dog")
//         res.send("The cow Says 'Moo' ");
//     else
//     res.send("Sorry, page not found...What are you doing with your life?");

//another shortest method for doing this.

    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    //console.log(sounds.pig);
    res.send("The " + animal + " says '" + sound + "'"); 
});

app.get("/repeat/:name/:num",function(req, res) {
    var number=Number(req.params.num);
    var name=req.params.name;
    var result="";
    for(var i=0;i<number;i++)
    {
        result=name + " " + result;
    }
    res.send(result);
});

app.get("*",function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Has Started!");
});