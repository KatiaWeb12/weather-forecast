import { myHTTP } from "./api.js";
let reg = document.querySelector(".reg");
let popup = document.querySelector(".popup");
let form = document.querySelector("form");
let regH2 = document.querySelector(".regH2");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let slider = document.querySelector(".slider");
let myDate = document.querySelector(".date");
let button = document.querySelector("button");
let onlyEl = document.querySelector(".onlyEl");
let body = document.querySelector("body");
let left = 0;
document.addEventListener("DOMContentLoaded", function () {
  let selects = document.querySelectorAll("select");
  let selectInit = M.FormSelect.init(selects);
  let modal = document.querySelector(".modal");
  let modalInit = M.Modal.init(modal);
});
reg.addEventListener("click", () => {
  popup.style.display = "flex";
  popup.style.animationName = "popup";
  popup.style.animationDuration = "3s";
  popup.style.animationIterationCount = "1";
  setTimeout(() => {
    form.style.display = "flex";
    regH2.style.display = "block";
  }, 2000);
});
window.addEventListener("click", (event) => {
  if (form.style.display === "flex" && event.target.classList[0] !== "hey") {
    popup.style.display = "none";
    form.style.display = "none";
    regH2.style.display = "none";
  }
});
let mainDate = new Date();
let date = mainDate.getDate();
let month = mainDate.getMonth();
let year = mainDate.getFullYear();
doNewDate(date);
function doNewDate(date) {
  if (date > 0 && date < 10) {
    myDate.textContent = `0${date}.0${month + 1}.${year}`;
  } else {
    myDate.textContent = `${date}.0${month + 1}.${year}`;
  }
}
function checkDate(date) {
  if (date > 31) {
    date = 1;
    return;
  }
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    if (date > 30) {
      date = 1;
    }
  }
  if (month === 1 && date > 29) {
    date = 1;
  }
}
next.addEventListener("click", () => {
  left -= 38;
  date += 1;
  if (left <= -266) {
    left = 0;
    date = mainDate.getDate();
  }
  slider.style.left = left + "vw";
  checkDate(date);
  doNewDate(date);
});
prev.addEventListener("click", () => {
  left += 38;
  date -= 1;
  if (left > 0) {
    left = -228;
    date = mainDate.getDate() + 6;
  }

  slider.style.left = left + "vw";
  checkDate(date);
  doNewDate(date);
});

let myHttpRes = myHTTP();
function service() {
  let mainUrl = "https://api.open-meteo.com/v1/forecast";
  return {
    weatherGetting(latitude, longitude, cb) {
      myHttpRes.get(
        `${mainUrl}?latitude=${latitude}&longitude=${longitude}&hourly=is_day&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,windspeed_10m_max&current_weather=true&timezone=Europe%2FMoscow`,
        cb
      );
    },
  };
}
function findError(err) {
  if (err) {
    alert(`error ${err} found`);
    document.location.reload(); //перезагрузка страницы
    return;
  }
}
function onGetResponse(err, data) {
  findError(err);
  renderCards(data);
}
function getCityInfo(err, data) {
  findError(err);
  useCoordinates(data);
}
function coordinatesCreating(city) {
  return myHttpRes.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=01e784806838253089e9f2bfd4f94b14`,
    getCityInfo
  );
}
function useCoordinates(data) {
  let lat = data[0].lat;
  let lon = data[0].lon;
  service().weatherGetting(lat, lon, onGetResponse);
}
function renderFirstEl(temp, maxTemp, minTemp, wind, snow, rain) {
  return `<div class="el so">
              <p class="now">${temp}°С</p>
              <div class="mainParams">
                <p class="params">Максимальная температура: <span>${maxTemp}°С</span></p>
                <p class="params">Минимальная температура: <span>${minTemp}°С</span></p>
                <p class="params">Скорость ветра: <span>${wind} м/с</span></p>
                <p class="params">Снег: <span>${snow} мм</span></p>
                <p class="params">Дождь: <span>${rain} мм</span></p>
              </div>  
            </div>`;
}
function renderEl(maxTemp, minTemp, wind, snow, rain) {
  return `<div class="el manyCont so">
              <div class="mainParams">
                <p class="params">Максимальная температура: <span>${maxTemp}°С</span></p>
                <p class="params">Минимальная температура: <span>${minTemp}°С</span></p>
                <p class="params">Скорость ветра: <span>${wind} м/с</span></p>
                <p class="params">Снег: <span>${snow} мм</span></p>
                <p class="params">Дождь: <span>${rain} мм</span></p>
              </div>  
          </div>`;
}
function renderCards(data) {
  let info = data;
  let fragment = "";
  fragment += renderFirstEl(
    info.current_weather.temperature,
    info.daily.temperature_2m_max[0],
    info.daily.temperature_2m_min[0],
    info.daily.windspeed_10m_max[0],
    info.daily.snowfall_sum[0],
    info.daily.precipitation_sum[0]
  );
  for (let i = 1; i < 7; i++) {
    fragment += renderEl(
      info.daily.temperature_2m_max[i],
      info.daily.temperature_2m_min[i],
      info.daily.windspeed_10m_max[i],
      info.daily.snowfall_sum[i],
      info.daily.precipitation_sum[i]
    );
  }
  slider.insertAdjacentHTML("afterbegin", fragment);
}
button.addEventListener("click", () => {
  if (onlyEl) {
    onlyEl.remove();
  }
  document.querySelectorAll(".so").forEach((el) => {
    el.remove();
  });
  let city = document.getElementById("last_name").value;
  if (!city) {
    alert("введи город");
    return;
  }
  coordinatesCreating(city); 
  // привет
});
