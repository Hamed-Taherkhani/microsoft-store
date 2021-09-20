const signInBtn = document.querySelector("button");
const formElement = document.querySelector("form");
const url = "???????????";

signInBtn.addEventListener("submit", eventHandler);
function eventHandler() {
  this.preventDefault();
  const http = new XMLHttpRequest();
  const formData = new formData(formElement);

  http.onerror = () => {
    alert("Something wrong happen!!!\nPlease try later.");
  };

  http.open("POST", url);
  http.send(formData);
}
