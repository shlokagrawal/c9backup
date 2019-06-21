var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2",{useNewUrlParser: true});

var Post = require("./models/post");//here we have to add this statement when we create modules of the file.
var User = require("./models/user");

// User.create({
//   email:"shlok@agrawal.com",
//   name:"Shlok Agrawal"
// });

Post.create({
    title:"How To Cook Burger? part 4",
    content:"blah blah blah dhjbdhdbbdbjs"
},function(err,post){
    if(err){console.log(err);}
    else{
    //  console.log(post); 
    User.findOne({name:"Shlok Agrawal"},function(err,user){
        if(err){console.log(err);}
        else{
            user.posts.push(post);
            user.save(function(err,data){
                if(err){console.log(err);}
                else{
                    console.log(data);
                }
            })
        }
    })
    }
});

//Find User
//find all posts for that user
// User.findOne({name:"Shlok Agrawal"}).populate("posts").exec(function(err,user){
//   if(err){console.log(err);}
//   else{
//       console.log(user);
//   }
// });

//populate method vo object id hata ke uska data dall deta hn apne user mn
//exec method execute karta hn dalne ka kaam.