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
  var date = new Date(now.getTime());
  var time = JSON.stringify(date);
  time = time.substr(1,time.length-3) + "+07:00";
  
  console.log(time);
  var Data = req.body;
  var PM = parseInt(Data.DevEUI_uplink.FPort,16).toString(2);
  var PMZ = "00000000"+PM;
  var team_PM = "00001101";

  var Lat = parseFloat(Data.DevEUI_uplink.LrrLAT);
  var Lon = parseFloat(Data.DevEUI_uplink.LrrLON);

team_PM = team_PM+PMZ.substr(PMZ.length-8,PMZ.length);

request.post({
    url: 'https://tsup-9c256.firebaseio.com/testsensor.json',
    json:{
        payload:team_PM
    }
    
},(err,res,body)=>{
    console.log("send Sensor Complete");
    
    
});

request.post({
  url: 'https://tgr2020-quiz2.firebaseio.com/quiz/sensor/team13.json',

  json:{
      payload:team_PM
  }
  
},(err,res,body)=>{
  console.log("send Sensor Complete");
  
  
});

request.post({

    url: 'https://tsup-9c256.firebaseio.com/testlocation.json',
    json:{
        "team":13,
        "latitude":Lat,
        "longitude": Lon,
        "timestamp": time

    }
    
},(err,res,body)=>{
    console.log("send Location Complete");
    
});

request.post({
  url: 'https://tgr2020-quiz2.firebaseio.com/quiz/location/team13.json',

  json:{
      "team":13,
      "latitude":Lat,
      "longitude": Lon,
      "timestamp": time

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