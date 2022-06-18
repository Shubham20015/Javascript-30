const speed = document.querySelector(".speed");
const speedBar = document.querySelector(".speed-bar");
const video = document.querySelector(".flex");

function handleSpeed(e) {
  const length = e.pageY - this.offsetTop;
  const percent = length / this.offsetHeight;
  const min = 0.3;
  const max = 3;
  const height = Math.round(percent * 100) + "%";
  const playbackRate = percent * (max - min) + min;
  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(2) + "x";
  video.playbackRate = playbackRate;
}

speed.addEventListener("mousemove", handleSpeed);
