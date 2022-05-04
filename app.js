var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');
var path = require('path');

const route = require('./routes/route');

var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use('/api',route);
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000,()=>{
console.log('server listening on port 3000');
});