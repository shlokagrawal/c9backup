var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo",{useNewUrlParser: true});

//POST :- title & content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post",postSchema);

//USER :- email & name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User",userSchema);


//creating user remember there are 2 methods 1 is implemented here and second one is that User.create(); method.
// var newUser = new User({
//   email: "sanyamagrawal188@gmail.com",
//   name: "Sanyam Agrawal"
// });

// newUser.posts.push({title:"good clothes",content:"yes we are going to start talk about new clothes."});
// newUser.save(function(err,user){
//   if(err){console.log(err);}
//   else{
//       console.log(user);
//   }
// });

//creating post
// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They Are Delicios"
// });

// newPost.save(function(err,post){
//     if(err){console.log(err);}
//     else{
//         console.log(post);
//     }
// });

//after adding this line now our user will look like this 
// name:"something",
// email:"something",
// posts:[{title:"something",content:"something"},{title:"something",content:"something"},{title:"something",content:"something"}]
// now the single user will be having many post following one:many relationship.

//retrive user
User.findOne({name:"Shlok Agrawal"},function(err,user){
   if(err){console.log(err);}
   else{
       user.posts.push({title:"second comment",content:"yes this is my second comment."});
       user.save(function(err,user){
           if(err){console.log(err);}
           else{
               console.log(user);
           }
       });
   }
});