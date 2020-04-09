var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

//view engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//firecontrols
todoController(app);



app.listen(3000);
console.log('Listening to port 3000');