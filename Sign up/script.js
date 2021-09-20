const signUpBtn = document.querySelector("button");
const formElement = document.querySelector("form");
const url = "??????????????";

signUpBtn.addEventListener("submit", eventHandler);
function eventHandler() {
  this.preventDefault();
  const http = new XMLHttpRequest();
  const formData = new FormData(formElement);

  http.onerror = () => {
    alert("Something wrong happen !!!\nPlease try late.");
  };

  http.open("Post", url);
  http.send(formData);
}
