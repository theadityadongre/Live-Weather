const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "cc5f87305a35356bffe459f5c36141fa";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);


    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      console.log(weatherData);
      const weatherIcon = weatherData.weather[0].icon
      const imageURl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      res.write("<p>Status: " + weatherDescription + ". </p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>");
      res.write("<img  src=" + imageURl + ">");
      res.send()
    })

  })
})



app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
