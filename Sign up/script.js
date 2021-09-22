const form = document.querySelector("form"),
  fileInput = document.querySelector("#avatar");

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
    imgElement.onload = function (e) {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 200;

      const scaleSize = MAX_WIDTH / e.target.width;
      canvas.width = MAX_WIDTH;
      canvas.height = e.target.height * scaleSize;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
      const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");

      // you can send srcEncoded to the server
      const resizedImage = document.createElement("img");
      resizedImage.src = srcEncoded;
      form.append(resizedImage);

      let imageFile = dataURLtoFile(srcEncoded, "avatar.png");
      fileInput.file = imageFile;
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
