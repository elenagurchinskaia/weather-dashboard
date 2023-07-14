// global variables
// request URL's with specific variable names
// store API keys
// selectors

var userInput = document.querySelector(".user-input");
var searchBtn = document.querySelector(".search-btn");
var currentWeatherEl = document.querySelector(".current-weather");
var forecastElement = document.querySelector(".forecast");
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
  var dateEl = document.querySelector(".date");
  var iconEl = document.querySelector(".icon");
  var tempEl = document.getElementsByClassName(".temperature");
  var windEl = document.getElementsByClassName(".wind");
  var humidEl = document.getElementsByClassName(".humidity");

  cityEl.textContent = "City: " + data.name;
  // dateEl.textContent = "Date:" + getCurrentDate();
  // iconEl.src = getWeatherIconURL(data.weather[0].icon);
  tempEl.textContent = "Temp:" + data.main.temp + "°F";
  windEl.textContent = "Wind" + data.wind + "m/s";
  humidEl.textContent = "Humidity" + data.main.humidity + "%";
}

// display forecast data
function forecastData(data) {
  // clear previous forecast data
  forecastElement.innerHTML = "";
  // access elements from html
  // loop thru the forecast data for the next 5 days
  for (var i = 0; i < 5; i++) {
    var forecastItem = data.list[i * 8];
    var dateEl = document.createElement("p");
    dateEl.textContent = "Date: " + forecastItem.dt_txt.split(" ")[0];
    var iconEl = document.createElement("img");
    // iconEl.src = getWeatherIconURL(forecastItem.weather[0].icon);
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + forecastItem.main.temp + "°C";
    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + forecastItem.main.humidity + "%";
    var windEl = document.createElement("p");
    windEl.textContent = "Wind Speed: " + forecastItem.wind.speed + " m/s";

    var forecastItemContainer = document.createElement("div");
    forecastItemContainer.classList.add("forecast-item");
    forecastItemContainer.append(tempEl, humidEl, windEl);
    forecastElement.appendChild(forecastItemContainer);
  }
}

// function getCurrentDate() {
//   var date = new Date();
//   return date.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// function getWeatherIconURL(iconCode) {
//   return "http://openweathermap.org/img/wn/" + iconCode + ".png";
// }

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

// > take an input
// call function that saves recent searches

//TODO:

// the input value appears as a secondary button below the search button
// only 7 buttons are displayed with no repetition of values
storeSearch();
// store recent searches
function storeSearch(city) {
  var searchHistoryItem = searchHistory.querySelectorAll("button");
  var isRepeated = Array.from(searchHistoryItem).some(function (item) {
    return item.textContent.toLowerCase() === city.toLowerCase();
  });
  // exit the function if teh city is already present
  if (isRepeated) {
    return;
  }
  if (searchHistoryItem.length >= 7) {
    // remove the oldest child
    searchHistory.removeChild(searchHistoryItem[0]);
  }

  var searchBtn = document.createElement("button");
  searchBtn.classList.add("secondary-btn", "flex-row", "align-center");

  searchHistory.appendChild(searchBtn);

  // var recentSearches = JSON.parse(localStorage.getItem("resentSearches"));
  // recentSearches.push(city);
  // localStorage.setItem("resentSearches", JSON.stringify(recentSearches));
  // userInput.textContent = "";
  //   searchHistory = document.createElement("button");
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
