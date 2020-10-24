var APIKey = "08f8917c69ae53232cbcb0b8a4c5e8db";

var queryURLWeatherData =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=GLoucester&appid=" +
  APIKey;

var queryURLForcast =
  "https://api.openweathermap.org/data/2.5/onecall?lat=0&lon=0&appid=" + APIKey;

var queryURLGeoCoding =
  "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyD01ZSVinBjwI3BtYhXtTh0B2oi50bLsC8";

$.ajax({
  url: queryURLWeatherData,
  method: "GET",
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {
    // Log the queryURL
    console.log(queryURLWeatherData);

    // Log the resulting object
    console.log(response);
  });

//GeoCoding API Key AIzaSyBzmUdJnj1Qy8H0bFJtY-NDOqonNXMu_uU

//Ajax call for the 5 day forcast for the area
$.ajax({ url: queryURLForcast, method: "GET" })
  //Storing all the retrived data in response
  .then(function (response) {
    console.log(response);
  });
$.ajax({ url: queryURLGeoCoding, method: "GET" })
  //Storing all the retrived data in response
  .then(function (response) {
    console.log(response);
  });
