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

// recent searches -> check localStorage
// function that displays data on the page
// search function -> brake into multiple functions

// search function
function search(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
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
      return fetch(forecastURL);
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then(function (data) {
      forecastData(data);
    })
    .catch(function (error) {
      console.error("Fetch error:", error);
    });
}

// display current weather function
function currentWeather(data) {
  // Clear previous data
  currentWeatherEl.innerHTML = "";
  // create a list of classes to style the content in CSS
  var weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weather-container");

  var cityEl = document.createElement("h1");
  cityEl.textContent = data.name;
  cityEl.classList.add("city-name");

  var dateEl = document.createElement("p");
  dateEl.textContent = getCurrentDate();
  dateEl.classList.add("weather-date");

  var iconEl = document.createElement("img");
  iconEl.src = getWeatherIconURL(data.weather[0].icon);
  iconEl.classList.add("weather-icon");

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

  currentWeatherEl.appendChild(weatherContainer);
}

// display forecast data
function forecastData(data) {
  forecastElement.innerHTML = "";

  var titleEl = document.createElement("h5");
  titleEl.classList.add("five-day-forecast");
  titleEl.textContent = "5-Day Forecast: ";
  forecastElement.appendChild(titleEl);

  for (var i = 0; i < 5; i++) {
    var forecastItem = data.list[i * 8];
    var forecastItemContainer = document.createElement("div");
    forecastItemContainer.classList.add("forecast-item", "col-md-2", "mb-3");

    var dateEl = document.createElement("p");
    dateEl.textContent = forecastItem.dt_txt.split(" ")[0];

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

// function to link icons from open weather
function getWeatherIconURL(iconCode) {
  return "https://openweathermap.org/img/wn/" + iconCode + ".png";
}

// the input value appears as a secondary button below the search button
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
