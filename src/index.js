// Timestamp
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

  let now = new Date();
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${date}/${month}/${year}`;
}

function formatDay() {
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

// Search engine
function showWeather(response) {
  let searchedCityElement = document.querySelector("h1");
  let currentTemperatureElement = document.querySelector("#temperature");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let currentHumidityElement = document.querySelector("#humidity");
  let currentWindElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  searchedCityElement.innerHTML = response.data.name;
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  currentHumidityElement.innerHTML = response.data.main.humidity;
  currentWindElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".search-field");
  search(cityInputElement.value);
}

// Geolocation
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
function searchPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

// Units
function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperatureElement = document.querySelector("#temperature");
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDay();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime();

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let position = document.querySelector(".current-location");
position.addEventListener("click", searchPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Berlin");
