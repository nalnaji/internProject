var express = require('express');
var app = express();


var fs = require('fs');

app.listen(8880);

app.get('/motion_detected', function (req, res) {

  if(err) throw err;
  
  console.log('MOTION DETECTED');
});