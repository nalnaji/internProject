var express = require('express');
var app = express();
var gpio = require("pi-gpio");
var sleep = require('sleep');
app.listen(8080);

app.get('/ranger_sensor', function (req, res) {
    var TRIG = 16;
    var ECHO = 18;
    var start;
    var end ;
    gpio.setDirection(TRIG, 'out', function(err){
      if(err) throw err;
      gpio.setDirection(ECHO, 'in', function(err){
        if(err) throw err;
        gpio.write(TRIG, 0, function(err){
          if(err) throw err;
          sleep.sleep(2);

          gpio.write(TRIG, 1, function(err){
            if(err) throw err;
            sleep.usleep(100);
            gpio.write(TRIG, 0, function(err){
              if(err) throw err;
              gpio.read(ECHO, function(err, value){
                if(err) throw err;
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















