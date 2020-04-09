//var data = [{item: 'Be Active'},{item: 'Be Responsible'},{item: 'Be Happy'}];
var body = require('body-parser');
var  url = body.urlencoded({extended:false});
var mongoose = require('mongoose');

require("dotenv").config();
// Database uri
const uri = process.env.ATLAS_URI;
//Connection String 
mongoose.connect(uri);

//Create a schema - blueprint
var todoSchema = new mongoose.Schema(
    {
    item: {
        type: String,
    },
},
{
    timestamps: true,
}
);


var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'Be patient'}).save(function(err){
//     if(err) throw err;
//     console.log('Item Saved');
// });

module.exports = function(app){

    app.get('/',function(req, res){
        //Get data from DB
        Todo.find({},function(err, data){
            if(err) throw err;
            res.render('todo',{Data : data});
        });
        
    });

    app.post('/todo',url,function(req, res){
        //Add data to DB
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
       
    });

    app.delete('/todo/:item',function(req, res){
        //Delete requeted item from DB
        Todo.find({item : req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
       
    });

};