'use strict';
const weatherIcon = document.querySelector('.weather-icon');
let input = document.querySelector('.location-input');
const headerWeatherinfo = document.querySelector('.location-weatherCondition');

const btn = document.querySelectorAll('.btn');
const btndegC = document.querySelector('.degC');
const btndegF = document.querySelector('.degF');

let locationName;
let tempUnit;
let uniData;

///FUNCTIONS///
const removeActive = (btn) => {
  btn.classList.remove('active');
};

const btnListners = () => {
  btn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      // console.log(e);
      // console.log(e.srcElement.classList.contains("active"));
      // removeActive(btn);
      if (!e.srcElement.classList.contains('active')) {
        btndegC.classList.toggle('active');
        btndegF.classList.toggle('active');
      }
      renderData(uniData);
    });
  });
};

/////

const getInput = () => {
  input.addEventListener('keypress', function (e) {
    if (e.key == 'Enter' && input.textContent != null) {
      locationName = input.value;
      updateData();
    }
  });
};

/**
 * @description
 * @returns current location
 *
 */
const checkInput = function () {
  if (!locationName) {
    return getCurrentLocation();
  }
};

const setLocation = (data) => {
  // console.log(data.coords);
  const { latitude, longitude } = data.coords;
  locationName = `${latitude},${longitude}`;
  return locationName;
};

const getCurrentLocation = async function () {
  const res = await navigator.geolocation.getCurrentPosition(setLocation);
  return res;
};

// console.log(weatherIcon);
// weatherIcon.addEventListener("click", function (e) {
//   weatherIcon.name = `partly-sunny-outline`;
// });
/////////////////////////////////////////////////

const getCurrentWeather = async function (location) {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=c9be8801bdb34590a3781244222208&q=${location}
    `
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.messaage);
  }
};

const getForecastWeather = async function (location) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f7269e595cc9437b820110020221210=${location}&days=5`
  );
  const data = await res.json();
  return data;
};

const checkState = () => {
  if (btndegC.classList.contains('active')) {
    return 'c';
  } else btndegF.classList.contains('active');
  return 'f';
};

//////////////Render Data////////////
//Current Data
const renderCurrentData = (current) => {
  // console.log(data);

  // console.log(current);

  let currentTemp = current[`temp_${tempUnit}`];
  const windSpeed = current.wind_mph;
  const precipitation = current.precip_mm;
  const humidity = current.humidity;
  // console.log(windSpeed, precipitation, humidity);

  const currTempEl = document.querySelector(`.current-temp`);
  const windSpeedEl = document
    .querySelector(`.windspeed`)
    .querySelector(`.other-val`);
  const precipitationEl = document
    .querySelector(`.precipitation`)
    .querySelector(`.other-val`);
  const humidityEl = document
    .querySelector(`.humidity`)
    .querySelector(`.other-val`);

  currTempEl.textContent = currentTemp;
  windSpeedEl.textContent = windSpeed;
  precipitationEl.textContent = precipitation;
  humidityEl.textContent = humidity;
  headerWeatherinfo.textContent = current.condition.text.toLowerCase();
};

const renderCurrentMaxMinTemp = function (forecast) {
  const forecastDay = forecast.forecastday[0];
  // console.log(forecastDay);
  const currentMaxTemp = document.querySelector('.current-maxTemp');
  const currentMinTemp = document.querySelector('.current-minTemp');
  // console.log(currentMaxTemp, currentMinTemp);
  currentMaxTemp.textContent = forecastDay.day[`maxtemp_${tempUnit}`];
  currentMinTemp.textContent = forecastDay.day[`mintemp_${tempUnit}`];
};

const renderForecastData = (forecast) => {
  // console.log(forecast.forecastday);
  const forecastArray = forecast.forecastday.slice(1);

  forecastArray.forEach(function (forecast, index) {
    const dayMaxTempEl = document
      .querySelector(`.day${index + 1}`)
      .querySelector('.f-max-temp');
    const dayMinTempEl = document
      .querySelector(`.day${index + 1}`)
      .querySelector('.f-min-temp');
    const dayAvgTempEl = document
      .querySelector(`.day${index + 1}`)
      .querySelector('.f-min-temp');

    const day = document
      .querySelector(`.day${index + 1}`)
      .querySelector(`.forecast-day`);

    // console.log(forecast.day);

    const fData = forecast.day;
    const dayIP = new Date(forecast.date);
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
    };

    // console.log(dayIP);
    // console.log(fData);
    const maxTemp = fData[`maxtemp_${tempUnit}`];
    // console.log(maxTemp);
    const minTemp = fData[`mintemp_${tempUnit}`];
    const avgTemp = fData[`avgtemp_${tempUnit}`];
    // console.log(maxTemp, minTemp, avgTemp);

    dayMaxTempEl.textContent = maxTemp;
    dayMinTempEl.textContent = minTemp;
    dayAvgTempEl.textContent = avgTemp;
    day.textContent = new Intl.DateTimeFormat('en-US', options).format(dayIP);
  });
};
// ForecastIcon
const iconChangeName = (currentCondition, current) => {
  if (currentCondition == 'cloudy') {
    weatherIcon.name = `cloudy-outline`;
  } else if (
    currentCondition.includes('partly cloudy') &&
    current.is_day == 1
  ) {
    weatherIcon.name = `partly-sunny-outline`;
  } else if (
    currentCondition.includes('partly cloudy') &&
    current.is_day == 0
  ) {
    weatherIcon.name = `cloudy-night-outline`;
  } else if (
    (currentCondition.includes('clear') ||
      currentCondition.includes('sunny')) &&
    current.is_day == 1
  ) {
    weatherIcon.name = `sunny-outline`;
  } else if (currentCondition.includes('clear') && current.is_day == 0) {
    weatherIcon.name = `moon-outline`;
  } else if (currentCondition.includes('thunder')) {
    weatherIcon.name = `thunderstorm-outline`;
  } else if (currentCondition.includes('rain')) {
    weatherIcon.name = `rainy-outline`;
  }
};

const forecastIconChangeName = function (icon, condition) {
  if (condition == 'cloudy') {
    icon.name = `cloudy-outline`;
  } else if (condition.includes('partly cloudy')) {
    icon.name = `partly-sunny-outline`;
  }
  // if (condition.includes("Partly cloudy")) {
  //   icon.name = `cloudy-night-outline`;
  // }
  else if (condition.includes('clear') || condition.includes('sunny')) {
    icon.name = `sunny-outline`;
  }
  // if (condition.includes("Clear")) {
  //   icon.name = `moon-outline`;
  // }
  else if (condition.includes('thunder')) {
    icon.name = `thunderstorm-outline`;
  } else if (condition.includes('rain')) {
    icon.name = `rainy-outline`;
  }
};

const renderCurrentIcon = (current) => {
  const currentCondition = current.condition.text.toLowerCase();
  // console.log(currentCondition);
  iconChangeName(currentCondition, current);
};

const renderForecastIcon = (forecast) => {
  // console.log(forecast);
  const forecastIconArr = forecast.forecastday.slice(1);
  forecastIconArr.forEach(function (data, index) {
    const forecastIcon = document
      .querySelector(`.day${index + 1}`)
      .querySelector(`.forecast-icon`);
    // console.log(forecastIcon);

    forecastIconChangeName(forecastIcon, data.day.condition.text.toLowerCase());
  });
};

// Data
const renderData = (data) => {
  // console.log(data);
  tempUnit = checkState();

  const { current, forecast } = data;
  renderCurrentData(current);
  renderCurrentMaxMinTemp(forecast);
  renderForecastData(forecast);
  renderCurrentIcon(current);
  renderForecastIcon(forecast);
};

//////////////

const startApp = function () {
  btnListners();
  getInput();
};
startApp();

const updateData = function () {
  tempUnit = checkState();
  // console.log(tempUnit);
  // locationName = checkInput();
  // console.log(locationName);
  if (!locationName) return;
  // getCurrentWeather(locationName).then((data) => {
  //   renderCurrentData(data);
  //   uniCurrentData = data;
  // });
  getForecastWeather(locationName).then((data) => {
    renderData(data);
    uniData = data;
  });
};

////LEGACY CODE//////

/*
const getWeatherData = function () {
  let key = "c9be8801bdb34590a3781244222208";
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://api.weatherapi.com/v1/current.json?key=c9be8801bdb34590a3781244222208&q=chennai`
  );
  request.send();
  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
  });

  const requestForecast = new XMLHttpRequest();
  requestForecast.open(
    "GET",
    `http://api.weatherapi.com/v1/forecast.json?key=c9be8801bdb34590a3781244222208&q=chennai&days=4`
  );
  requestForecast.send();
  requestForecast.addEventListener("load", function () {
    const dataForecast = JSON.parse(this.responseText);
    console.log(dataForecast);
  });
};*/
