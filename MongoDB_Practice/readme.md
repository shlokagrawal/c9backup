# Our First Mongo Commands
# refer section 29 lecture 294 for better understanding.

1) mongod:- to start the mongodb
2) mongo:- to start the terminal of mongodb (open in new terminal) 
3) help:- shows different commands avilable with mongodb.
4) show dbs:- to show the databases
admin   0.000GB
config  0.000GB
local   0.000GB
5) use:- to create a new database or to reuse it. when we use "use" command first it will create that database and then by default it will use it
6) insert:- eg:- db.dogs.insert({name: "Lusy", breed: "Mutt"})
7) find:- eg:- db.dogs.find()
8) update:- eg:-db.dogs.update({breed:"Lambradodle"},{$set:{name:"Busty"}}) {$set:{kuch object}} issliyeh use hota hn ki update command jub normal execute hoti hn to sab jo pehle se vo query mn sab udake naya dalti hn par set use karne se jo pehle se uspe changes nahi hote do it ypurself.
9) remove:- eg:-  db.dogs.remove({breed:"Mutt",name:"Rusty"})

in this mongodb database we create collections in  database for example we are going to create dogs collections in demo database.

//our practice outputs

> help
        db.help()                    help on db methods
        db.mycoll.help()             help on collection methods
        sh.help()                    sharding helpers
        rs.help()                    replica set helpers
        help admin                   administrative help
        help connect                 connecting to a db help
        help keys                    key shortcuts
        help misc                    misc things to know
        help mr                      mapreduce

        show dbs                     show database names
        show collections             show collections in current database
        show users                   show users in current database
        show profile                 show most recent system.profile entries with time >= 1ms
        show logs                    show the accessible logger names
        show log [name]              prints out the last segment of log in memory, 'global' is default
        use <db_name>                set current database
        db.foo.find()                list objects in collection foo
        db.foo.find( { a : 1 } )     list objects in foo where a == 1
        it                           result of the last line evaluated; use to further iterate
        DBQuery.shellBatchSize = x   set default number of items to display on shell
        exit                         quit the mongo shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> help kyes
unknown help option
> keys
2019-01-07T14:43:42.741+0000 E QUERY    [thread1] ReferenceError: keys is not defined :
@(shell):1:1
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use demo
switched to db demo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db.dogs.insert({name: "Rusty", breed: "Mutt"})
WriteResult({ "nInserted" : 1 })
> dogs
2019-01-07T15:43:35.254+0000 E QUERY    [thread1] ReferenceError: dogs is not defined :
@(shell):1:1
> show collections
dogs
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
> db.dogs.insert({name: "Lusy", breed: "Mutt"})
WriteResult({ "nInserted" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
> db.dogs.find({name:"Rusty"})
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
> db.dogs.insert({name: "Lulu", breed: "Poodle"})
WriteResult({ "nInserted" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "name" : "Lulu", "breed" : "Poodle" }
> db.dogs.find({breed:"Poodle"})
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "name" : "Lulu", "breed" : "Poodle" }
> db.dogs.update({name:"Lulu"},{breed:"Lambradodle"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "breed" : "Lambradodle" }
> db.dogs.insert({name: "Lulu", breed: "Poodle"})
WriteResult({ "nInserted" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c337635e2796b541891be94"), "name" : "Lulu", "breed" : "Poodle" }
> db.dogs.update({name:"Lulu"},{$set{breed:"Lambradodle"}})
2019-01-07T15:55:56.071+0000 E QUERY    [thread1] SyntaxError: missing : after property id @(shell):1:34
> db.dogs.update({name:"Lulu"},{$set:{breed:"Lambradodle"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c337635e2796b541891be94"), "name" : "Lulu", "breed" : "Lambradodle" }
> db.dogs.insert({name:"juju",breed:"koja",iscute:true})
WriteResult({ "nInserted" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c337635e2796b541891be94"), "name" : "Lulu", "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "name" : "juju", "breed" : "koja", "iscute" : true }
> db.dogs.update({name:"juju"})
2019-01-07T15:59:54.881+0000 E QUERY    [thread1] Error: need an object :
DBCollection.prototype._parseUpdate@src/mongo/shell/collection.js:443:1
DBCollection.prototype.update@src/mongo/shell/collection.js:483:18
@(shell):1:1
> db.dogs.update({name:"juju"},{blow:"keen"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c337635e2796b541891be94"), "name" : "Lulu", "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "blow" : "keen" }
> db.dogs.update({blow:"keen"},{name:"Koja",breed:"Doja"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c337635e2796b541891be94"), "name" : "Lulu", "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "name" : "Koja", "breed" : "Doja" }
> db.dogs.update({breed:"Lambradodle"},{$set:{name:"Busty"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c3374fce2796b541891be93"), "breed" : "Lambradodle", "name" : "Busty" }
{ "_id" : ObjectId("5c337635e2796b541891be94"), "name" : "Lulu", "breed" : "Lambradodle" }
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "name" : "Koja", "breed" : "Doja" }
> db.dogs.remove({breed:"Lambradodle"})
WriteResult({ "nRemoved" : 2 })
> db.dogs.find()
{ "_id" : ObjectId("5c33736ee2796b541891be91"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c337472e2796b541891be92"), "name" : "Lusy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "name" : "Koja", "breed" : "Doja" }
> db.dogs.remove({breed:"Mutt"},{name;"Rusty"})
2019-01-07T16:06:39.198+0000 E QUERY    [thread1] SyntaxError: missing : after property id @(shell):1:35
> db.dogs.remove({breed:"Mutt"},{name:"Rusty"})
WriteResult({ "nRemoved" : 2 })
> db.dogs.find()
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "name" : "Koja", "breed" : "Doja" }
> db.dogs.insert({name: "Lulu", breed: "Poodle"})
WriteResult({ "nInserted" : 1 })
> db.dogs.insert({name: "Rusty", breed: "Mutt"})
WriteResult({ "nInserted" : 1 })
> db.dogs.insert({name: "Lusy", breed: "Mutt"})
WriteResult({ "nInserted" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "name" : "Koja", "breed" : "Doja" }
{ "_id" : ObjectId("5c33793ee2796b541891be96"), "name" : "Lulu", "breed" : "Poodle" }
{ "_id" : ObjectId("5c33794fe2796b541891be97"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c33795ae2796b541891be98"), "name" : "Lusy", "breed" : "Mutt" }
> db.dogs.remove({breed:"Mutt",name:"Rusty"})
WriteResult({ "nRemoved" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c33775ae2796b541891be95"), "name" : "Koja", "breed" : "Doja" }
{ "_id" : ObjectId("5c33793ee2796b541891be96"), "name" : "Lulu", "breed" : "Poodle" }
{ "_id" : ObjectId("5c33795ae2796b541891be98"), "name" : "Lusy", "breed" : "Mutt" }
> db.dogs.update({breed:"Lambradodle"},{$set:{name:"Busty"}})