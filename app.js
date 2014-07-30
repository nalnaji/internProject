var express = require('express');
var app = express();
var gpio = require("pi-gpio");
var sleep = require('sleep');
var fs = require('fs');
var PythonShell = require('python-shell');
app.listen(8080);

app.get('/ranger_sensor', function (req, res) {
    PythonShell.run('measure.py', function (err, results) {
      if(err) throw err;
      console.log('' + results);
      res.send(null);
    });
});

app.get('/togglelight', function (req, res) {
  var LIGHT = parseInt(req.query.pin);

    var pathToLIGHT = '/sys/devices/virtual/gpio/gpio2/value';
    var status = fs.readFileSync(pathToLIGHT, {encoding: 'utf8'}).charAt(0);
    console.log(status);
    if( status == '0'){
      gpio.write(LIGHT, 1, function(err){
        if(err) throw err;    
        console.log('Turned light on');
        res.send(null);
                 
      });
    }
    else{
      gpio.write(LIGHT, 0, function(err){
        if(err) throw err;      
        console.log('Turned light off');  
        res.send(null);
              
      });
    }
});













