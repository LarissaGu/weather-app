function formatDate() {
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day}<br />${date}/${month}/${year}`;
}

function formatDay(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date(timestamp * 1000);
  let day = days[now.getDay()];
  return `${day}`;
}

function formatTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2 forecast">
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" alt="" />
              <p class="forecast-temp">
                <span id="max-temperature-forecast">${Math.round(
                  forecastDay.temperature.minimum
                )}</span>
                °C | <span id="min-temperature-forecast">${Math.round(
                  forecastDay.temperature.maximum
                )}</span> °C
              </p>
              <p class="forecast-day">${formatDay(forecastDay.time)}</p>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "f1adaca67t6e03d488b4ca1d5710830o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function defineEmoji(response) {
  let feelsLikeEmoji = document.querySelector("#feels-like-emoji");
  let feelsLikeElement = Math.round(response.data.temperature.feels_like);
  if (feelsLikeElement < 10) {
    feelsLikeEmoji.innerHTML = "⛄️";
  } else if (feelsLikeElement >= 10 && feelsLikeElement < 25) {
    feelsLikeEmoji.innerHTML = "🌻";
  } else {
    feelsLikeEmoji.innerHTML = "🏝";
  }
}

function showWeather(response) {
  console.log(response.data);
  let searchedCityElement = document.querySelector("h1");
  let currentTemperatureElement = document.querySelector("#temperature");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let currentHumidityElement = document.querySelector("#humidity");
  let currentWindElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let feelsLikeElement = document.querySelector("#feels-like");

  searchedCityElement.innerHTML = response.data.city;
  currentTemperatureElement.innerHTML = Math.round(
    response.data.temperature.current
  );
  weatherDescriptionElement.innerHTML = response.data.condition.description;
  currentHumidityElement.innerHTML = response.data.temperature.humidity;
  currentWindElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);

  defineEmoji(response);
  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "f1adaca67t6e03d488b4ca1d5710830o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".search-field");
  search(cityInputElement.value);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f1adaca67t6e03d488b4ca1d5710830o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&units=metric&key=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
function searchPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentDay = document.querySelector("#current-day");
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime();

let position = document.querySelector(".current-location");
position.addEventListener("click", searchPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Berlin");
