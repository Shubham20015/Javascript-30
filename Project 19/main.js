const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const redEffectBtn = document.querySelector("#redEffectBtn");
const rgbSplitBtn = document.querySelector("#rgbEffectBtn");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => console.err("Something Gonna Happen 😠" + err));
}
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  video.style.display = "none";
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // Take pixels value from canvas
    let pixels = ctx.getImageData(0, 0, width, height);

    // Mess with them (These functions  not working simultaneously , I have to find rason for this and solve it.)
    // pixels = greenScreen(pixels);
    // redEffectBtn.addEventListener("click", () => (pixels = redEffect(pixels)));
    // rgbSplitBtn.addEventListener("click", () => {
    //   pixels = rgbSplit(pixels);
    // This is for showing 1 movment in 10 frames nearly
    //   ctx.globalAlpha = 0.1;
    // });

    // Put pixels data back in canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // Play the sound
  snap.currentTime = 0;
  snap.play();

  // Take data out of canvas
  const data = canvas.toDataURL("image/jpeg");
  const linkCreated = document.createElement("a");
  linkCreated.href = data;
  linkCreated.setAttribute("download", "Your photo");
  linkCreated.innerHTML = `<img src="${data}" alt="Some of your photos you clicked" />`;
  strip.insertBefore(linkCreated, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
