var express = require("express");//to insert express framework in our application which we have downloaded
var app=express();//to call all the methods in express we have to put value of express() method in variable.
//and will use that variable for calling predefined methods of express framework.

//the code we are writing below and performing action this action is called routing.
//#ROUTING.
//in routing order matters most if i enter /dog then it will check wheather it matches with "/" or "/bye"
//and the it will find it perfect match "/dog".
//and if we put "*" in first of order then we will not able to call any other urls like "/","/bye" and "/dog"
//because * will take all the url requests to it and will not pass to the other URLS.


// "/" => "Hi There!"
app.get("/",function(req,res){
    res.send("hello shlok !");
});
// "bye" => "Good Bye!"
app.get("/bye",function(req,res){
    res.send("Good Bye!");
});
// "dog" => "MEOW!"
app.get("/dog",function(req, res) {
    res.send("MEOW!");
});

//for example apna url koi pattern follow karra hn to apan express mn pattern : iisse bana skate hn
//for example www.reddit.com/r/soccer agar esa url hn to
//apan usse ese likhenge
app.get("/r/:somename",function(req, res) {
    //console.log(req.params.somename);//req contains different and vast data with it in which params is the one which contains 
    //data passed in url for example in our url https://project-1-shlokagrawal.c9users.io/r/cricket 
    //the data passed in somename is cricket so params contain data in form of object like this params{somename:cricket}.
    var name=req.params.somename.toUpperCase();
    res.send("YOU ARE IN THE "+name+" SUBREBBIT");
})

//for example abb apna url ka pattern kuch esa hn www.reddit.com/r/soccer/comments/q34rtuy/first-soccer-game
app.get("/r/:somename/comments/:id/:title",function(req, res) {
    //data passed in url for example in our url https://project-1-shlokagrawal.c9users.io/r/usa/comments/1233kskks/oi-pl
    console.log(req.params);//{ somename: 'usa', id: '1233kskks', title: 'oi-pl' }
    res.send("welcome to the comments page!!!");
})
//comments vese ka vesa rahega quki apna comments page ka naam to change ni ho sakta hn baki sab changed rahega.

// * is used when user type address which is not defined for eg:- if we type /dogs instead of /dog in url
//then we will get error Cannot GET /dogs so to overcome this error on other urls we will pu message through *
//see the code below
app.get("*",function(req, res) {
    res.send("YOU ARE THE STAR!!!");
})

//tell express to listen for request (start server)
//because we are using cloud 9 so we will not mention the port number here we will use another thing
//through which cloud 9 servers will automatically will get there defined port number from which port number to start the server
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Has Started!");
});
//process.env.PORT and process.env.IP this 2 statements will automatically assign the port number and IP to the server.
