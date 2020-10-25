//var inputcity

var APIKey = "75833e5fbaf17800fbdc8029c299e930";
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var year = d.getFullYear();
var formattedDate = month + "/" + day + "/" + year;

//button click get string of city typed
//button #srch-btb from id getCity
$("#srch-btn").on("click", function () {
  var city = "";
  var city = $("#getCity").val();
  var queryURLWeatherData =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    city +
    "&appid=" +
    APIKey;
  $("#city-date1").text(city + " " + formattedDate);

  $.ajax({
    url: queryURLWeatherData,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL
      console.log("Current Weather Data:");
      console.log(queryURLWeatherData);
      //Current Temp

      $("#temp1").text(
        "Temperature: " +
          ((response.main.temp - 273.15) * 1.8 + 32).toFixed() +
          " F"
      );
      //Current Humidity
      $("#humidity1").text("Humidity: " + response.main.humidity + "%");
      //Current WindSpeed
      $("#windSpeed1").text(
        "Wind speed: " + (response.wind.speed * 2.23694).toFixed() + " mph"
      );

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
          console.log("5 Day Forcast Data:");
          console.log(response);
          //Add UV Index to the current
          $("#UVIndex1").text("UVI: " + response.current.uvi);
          $("#five-day-forcast").append($("<h5>5 Day Forecast:</h5>"));
          for (var i = 1; i < 5; i++) {
            day + i;
            //Create a Day div
            //Add updated Date to the dive
            //Add tempto div
            //add humidity to div
            var dayDiv = $("<div>");
            var tempTag = $("<p>");
            var dateTag = $("<p>");
            var humidityTag = $("<p>");
            var dailyTemp = (
              (response.daily[i].temp.day - 273.15) * 1.8 +
              32
            ).toFixed();
            tempTag.text(dailyTemp + " F");
            //Date

            dayDiv.append(tempTag);
          }
        });
    });
});
