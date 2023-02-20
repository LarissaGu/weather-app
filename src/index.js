// Search engine

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-field");

  function showWeather(response) {
    console.log(response.data);
    let searchedCity = response.data.name;
    let currentTemperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed);

    let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchedCity}`;
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${currentTemperature} °C`;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = `${description}`;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = `${humidity}`;
    let currentWind = document.querySelector("#wind-speed");
    currentWind.innerHTML = `${wind}`;
  }

  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Geolocation
function showWeatherLocation(response) {
  console.log(response.data);
  let searchedCity = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchedCity}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentTemperature} °C`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}`;
  let currentWind = document.querySelector("#wind-speed");
  currentWind.innerHTML = `${wind}`;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeatherLocation);
}
function searchPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let position = document.querySelector(".current-location");
position.addEventListener("click", searchPosition);

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
