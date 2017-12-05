var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var companies = require('./routes/companies');
var cars = require('./routes/cars');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

app.use('/companies', companies);
app.use('/cars', cars);

app.listen(port, function(){
    console.log('listening on port', port);  
});