var APIKey = "75833e5fbaf17800fbdc8029c299e930";
var city = "Gloucester City,New Jersey";

var queryURLWeatherData =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" +
  city +
  "&appid=" +
  APIKey;

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
    var longitude = response.coord.lon;
    var latitude = response.coord.lat;
    var queryURLForcast =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      APIKey;
    //Ajax call for the 5 day forcast for the area
    $.ajax({ url: queryURLForcast, method: "GET" })
      //Storing all the retrived data in response
      .then(function (response) {
        console.log(response);
      });
  });
