function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);

/// search city api key

function searchCity(city) {
  apiKey = "5e64c3tb70d2afbdd0ba0e314o875a8e";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=5e64c3tb70d2afbdd0ba0e314o875a8e&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

///

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = response.data.city;

  let countryElement = document.querySelector("#currentCountry");
  countryElement.innerHTML = response.data.country;

  let descriptionElement = document.querySelector("#descriptionWeather");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);
  let currentTimeElement = document.querySelector("#currentTime");
  currentTimeElement.innerHTML = showDate(date);
}

// current time

function showDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

searchCity("Oslo");
