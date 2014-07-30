var express = require('express');
var app = express();
var gpio = require("pi-gpio");
var sleep = require('sleep');
var fs = require('fs');
app.listen(8080);

app.get('/ranger_sensor', function (req, res) {
    var TRIG = 16;
    var ECHO = 18;
    var start;
    var end ;

    gpio.open(TRIG, 'out', function(err) {
      if(err) throw err;
      gpio.open(ECHO, 'in', function(err) {
        if(err) throw err;
        gpio.write(TRIG, 0, function(err){
          if(err) throw err;
          console.log("Waiting For Sensor To Settle");
          sleep.sleep(2);

          gpio.write(TRIG, 1, function(err){
            if(err) throw err;
            sleep.usleep(100);
            gpio.write(TRIG, 0, function(err){
              if(err) throw err;
              var pathToECHO = '/sys/devices/virtual/gpio/gpio24/value';
              console.log(fs.readFileSync(pathToECHO, {encoding: 'utf8'}).charAt(0));
              start = Date.now();
              while(fs.readFileSync(pathToECHO, {encoding: 'utf8'}).charAt(0) == '0' ){
                start = Date.now();
              }
              console.log('Exited first while: ' + start);
              //console.log(fs.readFileSync(pathToECHO, {encoding: 'utf8'}));
              while(fs.readFileSync(pathToECHO, {encoding: 'utf8'}).charAt(0) == '1'){
                end = Date.now();
              }
              console.log('Exited second while: '+ end);
              console.log(start +'');
              console.log(end +'');
              var duration = end - start;

              var distance = Math.round(duration * 17150);

              gpio.close(TRIG, function(err){
                gpio.close(ECHO, function(err){
                  res.send('DISTANCE: ' + distance);
                });
              });
            });
          });
        });
      });
    });

});

app.get('/togglelight', function (req, res) {
  var LIGHT = parseInt(req.query.pin);

  gpio.open(LIGHT, 'out', function(err) {
    if(err) throw err;

    var pathToLIGHT = '/sys/devices/virtual/gpio/gpio2/value';
    var status = fs.readFileSync(pathToLIGHT, {encoding: 'utf8'}).charAt(0);
    if( status == '0'){
      gpio.write(LIGHT, 1, function(err){
        if(err) throw err;    
        console.log('Turned light on');
        gpio.close(LIGHT, function(){
          res.send(null);
        });          
      });
    }
    else{
      gpio.write(LIGHT, 0, function(err){
        if(err) throw err;      
        console.log('Turned light off');  
        gpio.close(LIGHT, function(){
          res.send(null);
        });        
      });
    }

  });
});













