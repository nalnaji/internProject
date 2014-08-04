var express = require('express');
var app = express();
var gpio = require("pi-gpio");
var sleep = require('sleep');
var fs = require('fs');
var PythonShell = require('python-shell');
app.listen(8880);

app.get('/motion_detected', function (req, res) {

  if(err) throw err;
  console.log('MOTION DETECTED');


});













