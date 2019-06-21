var mongoose = require("mongoose");

//USER :- email & name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"//11th line valla Post hn not to be confused with HTML valla POST.
        }
    ]
});

var User = mongoose.model("User",userSchema);

module.exports = User;