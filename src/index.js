// Fahrenheit
function showFahrenheit() {
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = `23 °`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius() {
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = `-5 °`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let day = document.querySelector("#current-day");
day.innerHTML = `${currentDay}`;

let date = document.querySelector("#current-date");
date.innerHTML = `${currentDate}/${currentMonth}/${currentYear}`;

let time = document.querySelector("#current-time");
time.innerHTML = `${currentHour}:${currentMinutes}`;

// Search engine
function showWeather(response) {
  console.log(response.data);
  let searchedCityElement = document.querySelector("h1");
  let currentTemperatureElement = document.querySelector("#temperature");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let currentHumidityElement = document.querySelector("#humidity");
  let currentWindElement = document.querySelector("#wind-speed");

  searchedCityElement.innerHTML = response.data.name;
  currentTemperatureElement.innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  currentHumidityElement.innerHTML = response.data.main.humidity;
  currentWindElement.innerHTML = Math.round(response.data.wind.speed);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Berlin");

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

let position = document.querySelector(".current-location");
position.addEventListener("click", searchPosition);
