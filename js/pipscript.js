const canvas = document.getElementById("canvasElement");
const menuButton = document.getElementById("menuButton");
const closeIcon = document.getElementById("closeIcon");
const pipOptions = document.getElementById("pipOptions");
const togglePipButton = document.getElementById("togglePipButton");
const bringBackDiv = document.querySelector(".bringBackDiv");
const bringBackButton = document.getElementById("bringBackButton");

let videoStream;
let videoElement;

bringBackDiv.style.display = "none";

function toggleElements() {
  console.log("Toggling elements");
  if (canvas.style.display === "none") {
    canvas.style.display = "block";
    bringBackDiv.style.display = "none";
    if (document.pictureInPictureElement) {
      document
        .exitPictureInPicture()
        .then(() => {
          canvas.style.display = "block";
        })
        .catch((error) => {
          console.error("Error exiting Picture-in-Picture mode:", error);
        });
    }
  } else {
    canvas.style.display = "none";
    bringBackDiv.style.display = "block";
  }
}

bringBackButton.addEventListener("click", toggleElements);

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    videoStream = stream;
    videoElement = document.createElement("video");
    videoElement.srcObject = stream;
    videoElement.play();

    const ctx = canvas.getContext("2d");
    setInterval(function () {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    }, 1000 / 30);

    videoElement.addEventListener("leavepictureinpicture", onExitPip, false);
  })
  .catch(function (err) {
    console.error("Error accessing the camera: " + err);
  });

menuButton.addEventListener("click", function () {
  pipOptions.style.display == "block"
    ? (pipOptions.style.display = "none")
    : (pipOptions.style.display = "block");
});

closeIcon.addEventListener("click", function () {
  window.close();
});

function onExitPip() {
  toggleElements();
}

togglePipButton.addEventListener("click", function () {
  pipOptions.style.display = "none";
  toggleElements();
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((error) => {
      console.error("Error exiting Picture-in-Picture mode:", error);
    });
  } else {
    if (videoStream && videoElement) {
      videoElement.requestPictureInPicture().catch((error) => {
        console.error("Error entering Picture-in-Picture mode:", error);
      });
      console.log("videoStream:", videoStream);
      console.log("videoElement:", videoElement);
    }
  }
});
