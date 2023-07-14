// global variables
// request URL's with specific variable names
// store API keys
// selectors
var userInput = document.querySelector(".user-input");
var searchBtn = document.querySelector(".search-btn");
var currentWeatherEl = document.querySelector(".current-weather");
var forecast = document.querySelector(".forecast");
var searchHistory = document.querySelector(".search-history");
var searchForm = document.querySelector("#search-form");

var APIKey = "759ef34db775cd33f6e32424d8cea697";

// TODO:function
// recent searches -> check localStorage
// function that displays data on the page
// search function -> brake into multiple functions

// search function
function search(city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentWeather(data);
      console.log(data);
      var { lat, lon } = data.coord;
      console.log(lon, lat);
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey;
      fetch(forecastURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          forecastData(data);
          console.log(data);
        });
    });
}

// display current weather function
function currentWeather(data) {
  //access elements from html
  var cityEl = document.getElementsByClassName(".city-title");
  var tempEl = document.getElementsByClassName(".temperature");
  var windEl = document.getElementsByClassName(".wind");
  var humidEl = document.getElementsByClassName(".humidity");

  cityEl.textContent = "City: " + data.name;
  tempEl.textContent = "Temp:" + data.main.temp;
  windEl.textContent = "Wind" + data.wind;
  humidEl.textContent = "Humidity" + data.main.humidity;
}

// display forecast data
function forecastData(data) {
  // clear previous forecast data
  forecast.innerHTML = "";
  // access elements from html
  // loop thru the forecast data for the next 5 days
  for (var i = 0; i < data.list.length; i += 8) {
    var forecastItem = data.list[i];
    var date = forecastItem.dt_txt;
    var temperature = forecastItem.main.temp;
    var wind = forecastItem.main.wind;
    var humidity = forecastItem.main.humidity;
    // create div element to display forecast data
    var forecastItemElement = document.createElement("div");
    forecastItemElement.classList.add(
      "col-2",
      "bg-dark",
      "text-white",
      "flex-row",
      "justify-space-between"
    );
    forecastItemElement.InnerHTML = "5-Day Forecast" + "<br/>";
    forecastItemElement.innerHTML = "<strong>Date:</strong> " + date + "<br/>";
    forecastItemElement.innerHTML =
      "<strong>Temp:</strong> " + temperature + "<br/>";
    forecastItemElement.innerHTML = "<strong>Wind:</strong> " + wind + "<br/>";
    forecastItemElement.innerHTML = "<strong>Humidity:</strong> " + humidity;

    forecast.appendChild(forecastItemElement);
  }
}

// function currentWeather(currentWeatherObj) {
//   console.log(currentWeatherObj);
//   // create a div that will hold results
//   var currentWeatherCard = document.createElement("div");
//   currentWeatherCard.classList.add("card", "text-dark", "mb-3");

//   var currentWeatherBody = document.createElement("div");
//   currentWeatherBody.classList.add("card-body");
//   currentWeatherBody.append(currentWeatherBody);

//   var titleEl = document.createElement("h3");
//   titleEl.textContent = currentWeatherObj.data.city.name;

//   var bodyTextEl = document.createElement("p");
//   bodyTextEl.innerHTML = "<b>Temp:</b>" + currentWeatherObj.data.main.temp + "<br/>";

//   if (currentWeatherObj.wind) {
//     bodyTextEl.innerHTML += "<b>Wind:</b>" + currentWeatherObj.data.wind + "<br/>";
//   }

//   if (currentWeatherObj.humidity) {
//     currentWeatherObj.innerHTML +=
//       "<b>Humidity:</b>" + currentWeatherObj.data.main.humidity + "<br>";
//   }
//   currentWeatherBody.append(titleEl, currentWeatherBody);
//   currentWeatherEl.append(currentWeatherCard);
// }

// Loop thru the current forecast data and display the retreived data
// currentWeather.forEach(userInput) {
// var date = dateTiime.toLocaleStorageString;
// .storeSearsch();

// > take an input
// call function that saves recent searches

//TODO:

// the input value appears as a secondary button below the search button
// only 7 buttons are displayed with no repetition of values
storeSearch();
// store recent searches
function storeSearch(city) {
  var searchBtn = document.createElement("button");
  searchBtn.textContent = city;
  searchBtn.classList.add("secondary-btn", "flex-row", "align-center");

  searchHistory.appendChild(searchBtn);

  // var recentSearches = JSON.parse(localStorage.getItem("resentSearches"));
  // recentSearches.push(city);
  // localStorage.setItem("resentSearches", JSON.stringify(recentSearches));
  // userInput.textContent = "";
  // for (var i = 0; i < 7; i++) {
  //   searchHistory = document.createElement("button");
  //   // displayData(city, currentWeather, forecastData);
  //   console.log(userInput);
  // update/call recent searches function
}

//TODO:
// function coordinates() {
//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
//   // > fetch request for coordinates with API
//   // .then - convert to Json format
//   // .then - receive and extract coordinates data
//   // call the weather function()
//   weather();
// }

//TODO:
// function forecastData() {
//   // use coordinates from first fetch to make another fetch weather data from API
//   // convert to Json format
//   // extract tempreture, wind and humidity + 5 day forecast from object data
//   // call displayData function()
//   displayData();
// }
displayData();
//TODO:
function displayData(event) {
  // display data to page dependant on HTML
  // multiple variables
  userInput.textContent = "";
  for (var i = 0; i < 5; i++) {
    // displaySearchData(currentWeather, forecastData);
    console.log(userInput);
    // searchHistory = document.createElement("button");
    // searchHistory.classList = "flex-row align-center";

    // searchHistory.textContent = data[i];
  }
}

//TODO:

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log(event.target);
  var city = userInput.value.trim();
  search(city);
});

// event listener for search button ("click", function(){
// var search =
// call function - search(var)
// }

searchHistory.addEventListener("click", function (event) {
  // event.preventDefault();
  search();
});

currentWeatherEl.addEventListener("click", function (event) {
  display(currentWeather);
});
// event listener for recent searches ("click", function() {
// create var for search term (text on button) - event.target
// call search function
// }

// var today = dayjs();
// $(".current-weather").text(today.format("MMM D, YYYY"));
// storeSearch();
