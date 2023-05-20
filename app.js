import { myHTTP } from "./api.js";
document.addEventListener("DOMContentLoaded", function () {
  let selects = document.querySelectorAll("select");
  let selectInit = M.FormSelect.init(selects);
  let modal = document.querySelector(".modal");
  let modalInit = M.Modal.init(modal);
});
