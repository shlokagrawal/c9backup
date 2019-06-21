//ALL REQUIRED NODE PACKAGES INSTALLED,IMPLKEMENTED AND USING.
var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();

var methodOverride = require("method-override");
//method overide is the new to us so listen what method override do in html5 there is no put and delete method in html5 because it was hard to implement in html 5 for developers.
//so method overide package will work for us and we will externally use method put and delete by the help of this package.

var expressSanitizer = require("express-sanitizer");
//we use express-sanitizer because when we are using <%-blog.body%> in our app show page any intellligent user can run script tag
//on our site and can change our site structure which will be problamatic for us
//so this package will allow rendering of all html elements in <%-blog.body%> but not script tag.


//DATABASE CONNECTED AND CREATED    
mongoose.connect("mongodb://localhost/restful_blog_app",{useNewUrlParser: true});

//APP CONFIG
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());//and only requirement is it should be after body parser only.
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String, //title of the blog
    image: String, //image of the blog
    body: String, //body or text or paragraph of the blog basicaly data of the blog.
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1547232960-809b5c697a6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80",
//   body: "HELLO THIS IS A BLOG POST!"
// });
//we have added callback function in create method previously apps and we find no error there so 
//hopefully we will not find any error here we are ignoring callback function here that's why.


//RESTFUL ROUTES

//INDEX ROUTE
app.get("/",function(req,res) {
   res.redirect("/blogs"); 
});

app.get("/blogs",function(req,res) {
    Blog.find({},function(err,blogs){
        if(err){console.log(err);}
        else
        {
             res.render("index",{blogs:blogs});      
        }
    });
});

//NEW ROUTE
app.get("/blogs/new",function(req, res) {
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs",function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);//refer lecture 313 section 31 if you dont't understand this line.
   Blog.create(req.body.blog,function(err,newlyCreatedBlog){
       if(err){res.redirect("new");}
       else
       {
           res.redirect("/blogs");
       }
   });
});

//SHOW ROUTE
app.get("/blogs/:id",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){res.redirect("/blogs");}
        else
        {
            res.render("show",{blog: foundBlog});
        }
    })
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){res.redirect("/blogs");}
        else
        {
            res.render("edit",{blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
//note:- we can also use post method there is no problem but we are following RESTFUL routing chart is given in chart.html so that's why we will use put method.
app.put("/blogs/:id",function(req,res){
    // res.send("UPDATED!");
    // Blog.findByIdAndUpdate(id,newdata,callback) basic syntax of findByIdAndUpdate method.
    
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlock){
        if(err){res.redirect("/blogs");}
        else
        {
            res.redirect("/blogs/"+req.params.id);
            // or we can do like this res.redirect("/blogs/"+updatedBlock._id);
            //both are the one and same.
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
    // res.send("YOU HAVE REACHED THE DELETE ROUTE");
    //method to delete is findByIdAndRemove(id,callback);
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){console.log(err);}
        else
        {
            res.redirect("/blogs");
        }
    })
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Blog App Server Has Started!");
});