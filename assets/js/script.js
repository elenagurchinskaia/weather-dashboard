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
      var { lat, lon } = data.coord; // credit Ben Martin
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
  // Clear previous data
  currentWeatherEl.innerHTML = "";

  var cityEl = document.createElement("h2");
  cityEl.textContent = data.name;

  var dateEl = document.createElement("p");
  dateEl.textContent = getCurrentDate();

  var iconEl = document.createElement("img");
  iconEl.src = getWeatherIconURL(data.weather[0].icon);

  var temperatureEl = document.createElement("p");
  var temperatureInCelsius = data.main.temp - 273.15;
  var temperatureInFahrenheit = (temperatureInCelsius * 9) / 5 + 32;
  temperatureEl.textContent =
    "Temperature: " + temperatureInFahrenheit.toFixed(2) + "°F";

  var humidityEl = document.createElement("p");
  humidityEl.textContent = "Humidity: " + data.main.humidity + "%";

  var windSpeedEl = document.createElement("p");
  windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + " m/s";

  currentWeatherEl.appendChild(cityEl);
  currentWeatherEl.appendChild(dateEl);
  currentWeatherEl.appendChild(iconEl);
  currentWeatherEl.appendChild(temperatureEl);
  currentWeatherEl.appendChild(humidityEl);
  currentWeatherEl.appendChild(windSpeedEl);
}

// display forecast data
function forecastData(data) {
  // clear previous forecast data
  forecastElement.innerHTML = "";

  // create title element for the forecast
  var titleEl = document.createElement("h3");
  titleEl.classList.add("five-day-forecast");
  titleEl.textContent = "5 - Day Forecast: ";

  // prepend the title element to the forecast container
  forecastElement.insertBefore(titleEl, forecastElement.firstChild);

  // loop thru the forecast data for the next 5 days
  for (var i = 0; i < 5; i++) {
    var forecastItem = data.list[i * 8];
    var dateEl = document.createElement("p");
    dateEl.textContent = "Date: " + forecastItem.dt_txt.split(" ")[0];
    var iconEl = document.createElement("img");
    iconEl.src = getWeatherIconURL(forecastItem.weather[0].icon);
    var temperatureEl = document.createElement("p");
    var temperatureInCelsius = forecastItem.main.temp - 273.15;
    var temperatureInFahrenheit = (temperatureInCelsius * 9) / 5 + 32;
    temperatureEl.textContent =
      "Temperature: " + temperatureInFahrenheit.toFixed(2) + "°F";
    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + forecastItem.main.humidity + "%";
    var windEl = document.createElement("p");
    windEl.textContent = "Wind Speed: " + forecastItem.wind.speed + " m/s";

    var forecastItemContainer = document.createElement("div");
    forecastItemContainer.classList.add("forecast-item");
    forecastItemContainer.append(
      dateEl,
      iconEl,
      temperatureEl,
      humidEl,
      windEl
    );
    forecastElement.appendChild(forecastItemContainer);
  }
}

function getCurrentDate() {
  var date = new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getWeatherIconURL(iconCode) {
  return "http://openweathermap.org/img/wn/" + iconCode + ".png";
}

// Loop thru the current forecast data and display the retreived data

// > take an input
// call function that saves recent searches

//TODO:

// the input value appears as a secondary button below the search button
// only 7 buttons are displayed with no repetition of values
storeSearch();
// store recent searches
function storeSearch(city) {
  var searchHistoryItems = searchHistory.querySelectorAll(".secondary-button");
  var isRepeated = Array.from(searchHistoryItems).some(function (item) {
    return item.textContent.toLowerCase() === city.toLowerCase();
  });
  // exit the function if the city is already present
  if (isRepeated) {
    return;
  }
  if (searchHistoryItems.length >= 7) {
    // remove the oldest child
    searchHistory.removeChild(searchHistoryItems[0]);
  }

  var searchBtn = document.createElement("button");
  searchBtn.classList.add("btn", "btn-secondary", "col-12");

  searchBtn.textContent = city;

  searchHistory.appendChild(searchBtn);

  // var recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
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

// event listener for form submission
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log(event.target);
  var city = userInput.value.trim();
  if (city) {
    search(city);
    storeSearch(city);
    userInput.value = "";
  }
});

// event listener for clicking on search history
searchHistory.addEventListener("click", function (event) {
  var clickedButton = event.target.closest("button");
  if (clickedButton) {
    var city = clickedButton.textContent;
    search(city);
  }
});

// var today = dayjs();
// $(".current-weather").text(today.format("MMM D, YYYY"));
