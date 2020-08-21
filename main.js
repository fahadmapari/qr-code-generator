const gen = document.getElementById("generate");
const qrData = document.getElementById("qr-input");
const print = document.getElementById("print");
const canvas = document.querySelector("canvas");
const link = document.getElementById("link");
const message = document.querySelector(".message");
const note = document.querySelector(".canvas-container h3");

function isCanvasBlank(canvas) {
  const context = canvas.getContext("2d");

  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );

  return !pixelBuffer.some((color) => color !== 0);
}

function showPopUp(msg, action) {
  message.innerHTML = msg;

  if (action) {
    message.classList.add("message-container");
  } else {
    message.classList.add("message-container");
    message.style.backgroundColor = "#ff3838";
  }
  setTimeout(() => {
    message.classList.remove("message-container");
    message.innerHTML = "";
    message.style.backgroundColor = "";
  }, 1500);
}

gen.addEventListener("click", (e) => {
  if (qrData.value) {
    QRCode.toCanvas(canvas, qrData.value, { width: 2000 }, function (error) {
      if (error) showPopUp(error, false);
      showPopUp("qr code successfully generated", true);
      qrData.value = "";
      note.textContent = "";
    });
  } else {
    showPopUp("please enter something", false);
  }
});

print.addEventListener("click", (e) => {
  if (isCanvasBlank(canvas)) {
    showPopUp("please generate qr code first", false);
  } else {
    link.setAttribute("download", `qr_code_${Date.now().toString()}.png`);
    link.setAttribute(
      "href",
      canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    );
    link.click();
  }
});
