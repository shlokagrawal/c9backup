var mongoose = require("mongoose");

//POST :- title & content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// var Post = mongoose.model("Post",postSchema);

//module.exports = Post; type 1
//or we can do this 
module.exports = mongoose.model("Post",postSchema);//we are doing this because we are returning
//same as we do in js functions we returns value 
//in file we have to use module.exports = returning value.
//we can return multiple value from file like module.exports={};
