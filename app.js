import { myHTTP } from "./api.js";
let reg = document.querySelector(".reg");
let popup = document.querySelector(".popup");
let form = document.querySelector("form");
let regH2 = document.querySelector(".regH2");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let slider = document.querySelector(".slider");
let myDate = document.querySelector(".date");
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
myDate.textContent = `${date}.0${month + 1}.${year}`;
next.addEventListener("click", () => {
  left -= 630;
  date += 1;
  if (left <= -4410) {
    left = 0;
    date = mainDate.getDate();
  }
  slider.style.left = left + "px";
  checkDate();
  myDate.textContent = `${date}.0${month + 1}.${year}`;
});
prev.addEventListener("click", () => {
  left += 630;
  date -= 1;
  if (left > 0) {
    left = -3780;
    date = mainDate.getDate() + 3;
  }
  slider.style.left = left + "px";
  checkDate();
  myDate.textContent = `${date}.0${month + 1}.${year}`;
});
function checkDate() {
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

// function onGetResponse(){
//   mainUrl =
//   myHTTP.get(err, data){

//     }
//   }
