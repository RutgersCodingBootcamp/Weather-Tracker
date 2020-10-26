//var inputcity

var APIKey = "75833e5fbaf17800fbdc8029c299e930";
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var year = d.getFullYear();
var formattedDate = month + "/" + day + "/" + year;

//Local Storage Build array of recent searches that become buttons
var localSearches = localStorage.getItem("recentCities");

//Every Search has to appened to this array but delete after 5 or 6
var displaySearches = ["Gloucester City", "Las Vegas", "Detroit"];

function displayInformation(city) {
  // var city = $("#getCity").val();
  console.log(city);
  var queryURLWeatherData =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    city +
    "&appid=" +
    APIKey;
  $("#city-date1").text(city + " " + formattedDate);

  displaySearches + city;
  var ulist = $("<ul>");
  for (var i = 0; i < displaySearches.length; i++) {
    var newBtn = $("<div>" + displaySearches[i] + "</div>");
    // newBtn.text(displaySearches[i]);
    newBtn.addClass("recent-city");
    newBtn.attr("id", "recent-" + i);
    newBtn.attr("value", displaySearches[i]);
    // newBtn.attr("id", "recent-city-" + i);
    var listItem = $("<li>");
    listItem.append(newBtn);
    ulist.append(listItem);
  }
  $("#city-buttons").append(ulist);

  //check for local storage content to display if content
  if (!localSearches) {
  }

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
          $("#five-day-forcast").empty();
          $("#five-day-forcast").append($("<h5>5 Day Forecast:</h5>"));

          for (var i = 1; i < 6; i++) {
            var d = new Date();
            d.setDate(d.getDate() + i);
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var year = d.getFullYear();
            //Create a Day div
            //Add updated Date to the div
            //Add tempto div
            //add humidity to div
            var dayDiv = $("<div>");
            dayDiv.addClass("forecast");

            var tempTag = $("<p>");
            var dateTag = $("<p>");
            dateTag.addClass("dateTitle");
            var humidityTag = $("<p>");
            var dailyTemp = (
              (response.daily[i].temp.day - 273.15) * 1.8 +
              32
            ).toFixed();

            //Date
            dateTag.text(month + "/" + day + "/" + year);

            //Temp
            tempTag.text("Temperature: " + dailyTemp + " F");

            //Humidity
            humidityTag.text("Humidity: " + response.daily[i].humidity + "%");

            //Build Div
            dayDiv.append(dateTag);
            dayDiv.append(tempTag);
            dayDiv.append(humidityTag);

            //Append div

            $("#five-day-forcast").append(dayDiv);
            console.log(day);
          }
        });
    });
}
$(document).ready(function () {
  $(document).on("click", ".recent-city", function (e) {
    city = $(this).text();

    displayInformation(city);
  });

  //button click get string of city typed
  //button #srch-btb from id getCity
  $("#srch-btn").on("click", function () {
    var city = $("#getCity").val();
    displayInformation(city);
  });
});
