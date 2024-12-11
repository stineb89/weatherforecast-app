// current time

let currentTime = new Date();
let day = currentTime.getDay();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
  7;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[day];
let currenttime = document.querySelector("#currentTime");
currenttime.innerHTML = `${currentDay}, ${hours}:${minutes}`;

// city search

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  let city = searchInput.value;
  let apiKey = "5e64c3tb70d2afbdd0ba0e314o875a8e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=5e64c3tb70d2afbdd0ba0e314o875a8e&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// current temperature

function displayTemperature(response) {
  let currentTemperatureElement = document.querySelector("#currentTemperature");
  currentTemperatureElement.innerHTML = Math.round(
    response.data.temperature.current
  );
  let currentCityElement = document.querySelector("#currentCity");
  currentCity.innerHTML = response.data.city;

  let currentCountryElement = document.querySelector("#currentCountry");
  currentCountry.innerHTML = response.data.country;

  let descriptionWeatherElement = document.querySelector("#descriptionWeather");
  descriptionWeather.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
}
