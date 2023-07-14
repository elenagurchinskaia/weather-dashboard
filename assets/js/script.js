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

// current weather function
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

// forecast weather function
function forecastData(data) {
  // access elements from html
  var forecastElement = document.getElementsByClassName(".forecast");
  // clear previous forecast data
  forecastElement.innerHTML = "";
  // loop thru the forecast data for teh next 5 days
  for (var i = 0; i < data.list.length; i += 8) {
    var forecastItem = data.list[i];
    var date = forecastItem.dt_txt("MM/dd/yyyy");
    var temperature = forecastItem.main.temp;
    var wind = forecastItem.main.wind;
    var humidity = forecastItem.main.humidity;
    // create div element to display forecast data
    var forecastItemElement = document.createElement("div");
    forecastItemElement.innerHTML = "<strong>Date:</strong> " + date + "<br/>";
    forecastItemElement.innerHTML =
      "<strong>Temp:</strong> " + temperature + "<br/>";
    forecastItemElement.innerHTML = "<strong>Wind:</strong> " + wind + "<br/>";
    forecastItemElement.innerHTML =
      "<strong>Humidity:</strong> " + humidity + "<br/>";
    forecastElement.appendChild(forecastItemElement);
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

storeSearch();
//TODO:
function storeSearch() {
  userInput.textContent = "";
  for (var i = 0; i < 7; i++) {
    searchHistory = document.createElement("button");
    displayData.userInput;
    console.log(userInput);
  }
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
function displayData() {
  // display data to page dependant on HTML
  // multiple variables
  userInput.textContent = "";
  for (var i = 0; i < 5; i++) {
    searchHistory = document.createElement("button");
    searchHistory.classList = "flex-row align-center";

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
  event.preventDefault();
  search();
});
// event listener for recent searches ("click", function() {
// create var for search term (text on button) - event.target
// call search function
// }

// var today = dayjs();
// $(".current-weather").text(today.format("MMM D, YYYY"));
// storeSearch();
