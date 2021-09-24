const form = document.querySelector("form"),
  fileInput = document.querySelector("#avatar"),
  container = document.querySelector(".container"),
  cropBtn = document.getElementById("crop-btn"),
  closeBtn = document.getElementById("close"),
  inputPanel = document.querySelector("#input-panel"),
  blur = document.querySelector("#blur"),
  base64Avatar = document.querySelector("#base64-avatar");

fileInput.addEventListener("change", eventHandler);
function eventHandler() {
  const file = this.files[0],
    reader = new FileReader();

  reader.readAsDataURL(file);
  reader.addEventListener("load", resizeImage);
  function resizeImage() {
    const result = this.result;

    const imgElement = document.createElement("img");
    imgElement.src = result;
    imgElement.onload = function () {
      container.children[1].append(imgElement);
      container.style.transform = "scale(1)";
      blur.style.transform = "scale(1)";
      creatCropper(imgElement);

      cropBtn.onclick = () => {
        if (inputPanel.childElementCount === 2)
          inputPanel.removeChild(inputPanel.children[1]);
        let canvasData = cropImage();
        let imageTag = document.createElement("img");
        imageTag.src = canvasData;
        imageTag.onload = (e) => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 150;
          const scaleSize = MAX_WIDTH / e.target.width;
          canvas.width = MAX_WIDTH;
          canvas.height = e.target.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
          const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");

          // you can send srcEncoded to the server
          const resizedImage = document.createElement("img");
          resizedImage.src = srcEncoded;
          inputPanel.append(resizedImage);

          base64Avatar.value = srcEncoded;
          cropperPopup();
        };
      };
    };
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}

closeBtn.addEventListener("click", abortCropper);
function abortCropper() {
  base64Avatar.value = "";
  fileInput.value = "";
  if (inputPanel.childElementCount === 2)
    inputPanel.removeChild(inputPanel.children[1]);
  cropperPopup();
}

function cropperPopup() {
  container.children[1].removeChild(container.children[1].children[0]);
  cropper.destroy();
  container.style.transform = "scale(0)";
  blur.style.transform = "scale(0)";
}

/* create a instance of Cropper and preparing image for cropping */
let croppable = false,
  cropper;
function creatCropper(image) {
  cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1,
    dragMode: "move",
    ready: function () {
      croppable = true;
    },
  });
}

// Crop the image and return base64 of cropped image.
function cropImage() {
  var croppedCanvas;
  var roundedCanvas;
  if (!croppable) {
    return;
  }
  // Crop
  croppedCanvas = cropper.getCroppedCanvas();
  // Round
  roundedCanvas = getRoundedCanvas(croppedCanvas);
  return roundedCanvas.toDataURL();
}

// Build a rounded canvas and return it
function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}

/* Check password strength */
const password = document.querySelector("#password"),
  confirmation = document.querySelector("#confirm-password"),
  lightRed = "#FF7F7F60",
  lightGreen = "#90ee9070";
let isValid = false;

password.addEventListener("input", checkStrength);
function checkStrength() {
  let pass = this.value;
  this.style.background = lightRed;

  isValid = false;
  if (pass.length >= 8)
    if (hasNumber(pass) && hasUpperLowerLetter(pass)) {
      this.style.background = lightGreen;
      isValid = true;
    }
}

function hasNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if (Number.isInteger(parseInt(str[i]))) return true;
  }
  return false;
}
function hasUpperLowerLetter(str) {
  let hasUpper = false,
    hasLower = false;
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) hasUpper = true;
    if (charCode >= 97 && charCode <= 122) hasLower = true;
    if (hasLower && hasUpper) return true;
  }
  return false;
}

// Check password confirmation
confirmation.addEventListener("input", checkConfirmation);
function checkConfirmation() {
  let pass = password.value,
    confirmationPass = this.value;

  this.style.background = lightRed;
  if (pass === confirmationPass && isValid) this.style.background = lightGreen;
}

/* Show password filed value */
const eyes = document.querySelector("#pass-panel div");
eyes.addEventListener("mousedown", () => displayPassword(true));
window.addEventListener("mouseup", () => displayPassword(false));
function displayPassword(isDisplayed) {
  event.preventDefault();
  if (isDisplayed) {
    // Show password
    password.type = "text";
    confirmation.type = "text";
  } else {
    // Hide password
    password.type = "password";
    confirmation.type = "password";
  }
}
