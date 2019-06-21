var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser: true});
//if there will no cat_app database it will create it first and then will use it.
//if we will not use this {useNewUrlParser: true} then we will get error 
//shlokagrawal:~/workspace/MongoDB_Practice/Mongoose $ node cats.js
//(node:3181) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
//^C

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
//this thing creates schema for us for example in mysql we define structure of database and names and there types.
//basically this is the method of creating schema for our mongodb database.

var Cat = mongoose.model("Cat",catSchema);
//as we have lerned earlier that mongodb database works on collections
//so our collection name will be "Cats"(it will be pluraized by mongodb) which is specified in model method.

//adding a new cat in a database
//there are 2 methods for adding data in datbase 

//  METHOD 1
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err,cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!");
//     }
//     else{
//         console.log("we just saved cat to the db.");
//         console.log(cat);
//     }
// });

//          METHOD 2
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
},function(err,cat){
    if(err)
    {
        console.log("Something went wrong!");
        console.log(err);
    }
    else{
        console.log("cat is added");
        console.log(cat);
    }
});

//retrieve all cats from the database and console.log each one.

Cat.find({},function(err,cats){
    if(err){
        console.log("Something went wrong");
        console.log(err);
    }
    else
    {
        console.log("all the cats......");
        console.log(cats);
    }
});