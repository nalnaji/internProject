var express = require('express');
var app = express();
var gpio = require("pi-gpio");
var sleep = require('sleep');
app.listen(8080);

app.get('/ranger_sensor', function (req, res) {
    var TRIG = 23;
    var ECHO = 24;
    var start;
    var end ;
    gpio.setDirection(TRIG, 'out', function(){
      gpio.setDirection(ECHO, 'in', function(){
        gpio.write(TRIG, 0, function(){
          sleep.sleep(2);

          gpio.write(TRIG, 1, function(){
            sleep.usleep(100);
            gpio.write(TRIG, 0, function(){
              gpio.read(ECHO, function(err, value){
                console.log(value);
                while(value == 0){
                  start = Date.now();
                }

                while(value == 1){
                  end = Date.now();
                }
                var duration = end.getTime() - start.getTime();
                var distance = Math.round(duration * 17150);

                res.send('DISTANCE: ' + distance);

              });
            });
          });
        });
      });
    });

});















