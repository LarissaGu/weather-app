/* let weather = [  {
    name: "Paris",
    temp: 19.7,
    humidity: 80,

  },
  {
    name: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  {
    name: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },

  {
    name: "San Francisco",
    temp: 20.9,
    humidity: 100,
  }, 

  { name: "Oslo", temp: -5, humidity: 20 },
];

let city = prompt("Enter your city");

if (city === "Paris") {
  alert(
    `It is currently ${Math.round(weather[0].temp)} °C (${Math.round(
      (weather[0].temp * 9 / 5 + 32
    )} °F) in ${city} with a humidity of ${weather[0].humidity}%.`
  );
} else {
  if (city === "Tokyo") {
    alert(
      `It is currently ${Math.round(weather[1].temp)} °C (${Math.round(
        weather[1].temp * 9 / 5 + 32
      )} °F) in ${city} with a humidity of ${weather[1].humidity}%.`
    );
  }

  if (city === "Lisbon") {
    alert(
      `It is currently ${Math.round(weather[2].temp)} °C (${Math.round(
        weather[2].temp * 9 / 5 + 32
      )} °F) in ${city} with a humidity of ${weather[2].humidity}%.`
    );
  }

  if (city === "San Francisco") {
    alert(
      `It is currently ${Math.round(weather[3].temp)} °C (${Math.round(
        weather[3].temp * (9 / 5) + 32
      )} °F) in ${city} with a humidity of ${weather[3].humidity}%.`
    );
  }

  if (city === "Oslo") {
    alert(
      `It is currently ${Math.round(weather[4].temp)} °C (${Math.round(
        weather[4].temp * (9 / 5) + 32
      )} °F) in ${city} with a humidity of ${weather[4].humidity}%.`
    );
  } else {
    alert(
      "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
    );
  }
} 