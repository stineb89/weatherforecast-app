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
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

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
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = showDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
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

  return `${day}, ${hours}:${minutes}`;
}

//

function getForecast(city) {
  let apiKey = "5e64c3tb70d2afbdd0ba0e314o875a8e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// forecast

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="forecast-background">
          <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div class="weather-forecast-icon">
                  <img src="${
                    day.condition.icon_url
                  }" class="weather-forecast-icon"/>
                  </div>
                <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temp">
                    <strong>${Math.round(day.temperature.maximum)}º</strong>
                  </div> /
                  <div class="weather-forecast-temp">${Math.round(
                    day.temperature.minimum
                  )}º</div>
                </div>
                </div>
              </div>
              `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Oslo");
