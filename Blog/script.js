const navLiElements = document.querySelectorAll("aside nav li");
const navSelectedItem = document.querySelector("#nav-selected-item");

/* control nav bar */
navLiElements.forEach((value) => {
  value.addEventListener("click", controlNavBar);
});

let clickedElement;
function controlNavBar() {
  let element = this;
  unfocusedControl();
  focusControl(element);
}

focusControl(navLiElements[0]);
function focusControl(element) {
  element.style.backgroundColor = "#fff";
  let border = element.children[0];
  border.style.display = "inline-block";
  border.style.animationName = "nav-border-animation";
  border.style.animationDirection = "alternate";
  let filledIcon = element.children[1].children[1];
  let regularIcon = element.children[1].children[0];
  regularIcon.style.display = "none";
  filledIcon.style.display = "inline-block";
  clickedElement = element;
}

function unfocusedControl() {
  if (clickedElement !== undefined) {
    clickedElement.style.backgroundColor = "transparent";
    clickedElement.children[0].style.display = "none";
    let filledIcon = clickedElement.children[1].children[1];
    let regularIcon = clickedElement.children[1].children[0];
    regularIcon.style.display = "inline-block";
    filledIcon.style.display = "none";
  }
}
/* --end-- */
