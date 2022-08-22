"use strict";
const weatherIcon = document.querySelector(".weather-icon");
let input = document.querySelector(".location-input");
const btn = document.querySelectorAll(".btn");
const btndegC = document.querySelector(".degC");
const btndegF = document.querySelector(".degF");

// TEst
// console.log(btn);
const removeActive = (btn) => {
  btn.classList.remove("active");
};

btn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // console.log(e);
    // console.log(e.srcElement.classList.contains("active"));
    // removeActive(btn);
    if (!e.srcElement.classList.contains("active")) {
      btndegC.classList.toggle("active");
      btndegF.classList.toggle("active");
    }
  });
});
/////
// console.log(input);
// let locationName;
// input.addEventListener("keypress", function (e) {
//   if (e.key == "Enter" && input.textContent != null) {
//     locationName = input.value;
//     console.log(locationName);
//   }
// });

// console.log(weatherIcon);
// weatherIcon.addEventListener("click", function (e) {
//   //   weatherIcon = "partly-sunny-outline";
//   weatherIcon.name = `partly-sunny-outline`;
// });

// let key = "c9be8801bdb34590a3781244222208";
// const request = new XMLHttpRequest();
// request.open(
//   "GET",
//   `http://api.weatherapi.com/v1/current.json?key=c9be8801bdb34590a3781244222208&q=chennai`
// );
// request.send();
// request.addEventListener("load", function () {
//   const data = JSON.parse(this.responseText);
//   console.log(data);
// });

// const requestForecast = new XMLHttpRequest();
// requestForecast.open(
//   "GET",
//   `http://api.weatherapi.com/v1/forecast.json?key=c9be8801bdb34590a3781244222208&q=chennai&days=4`
// );
// requestForecast.send();
// requestForecast.addEventListener("load", function () {
//   const dataForecast = JSON.parse(this.responseText);
//   console.log(dataForecast);
// });
