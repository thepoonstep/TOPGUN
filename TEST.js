const request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Sample Code for RESTful API");
})

app.post('/getpm', function (req, res) {


  var now = new Date();
  var date = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  var time = JSON.stringify(date);
  console.log(time);
  var Data = req.body;
  var PM = parseInt(Data.FPort,16).toString(2);
  var PMZ = "00000000"+PM;
  var team_PM = "00001101";

  var Lat = parseFloat(Data.LrrLAT);
  var Lon = parseFloat(Data.LrrLON);

team_PM = team_PM+PMZ.substr(PMZ.length-8,PMZ.length);

request.post({
    url: 'https://tsup-9c256.firebaseio.com/team13_sensor.json',
    json:{
        payload:team_PM
    }
    
},(err,res,body)=>{
    console.log("send Sensor Complete");
    console.log(Data);
    
});

request.post({
    url: 'https://tsup-9c256.firebaseio.com/team13_location.json',
    json:{
        "team":13,
        "latitude":Lat,
        "longitude": Lon,
        "timestamp": date

    }
    
},(err,res,body)=>{
    console.log("send Location Complete");
    
});



  //console.log(team_PM);
  res.send("nice");

 

})

var server = app.listen(8080, function () {
  //var port = server.address().port
  console.log("Start server at port 8080");
})