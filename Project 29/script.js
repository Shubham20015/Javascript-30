const timerDisplay = document.querySelector(".display__time-left");
const endTimer = document.querySelector(".display__end-time");
const music = document.querySelector(".endSound");
const buttons = document.querySelectorAll("[data-time]");
let countDown;

function timer(seconds) {
  // clear any existing timers
  clearInterval(countDown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);
  endTimeDisplay(then);

  countDown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000);
    //   check if it should be stop or not
    if (secondLeft < 0) {
      music.play();
      setTimeout(() => music.pause(), 5000);
      clearInterval(countDown);
      return;
    }
    // Display it
    displayTime(secondLeft);
  }, 1000);
}

function displayTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  const display = `${mins}:${remainSeconds < 10 ? "0" : ""}${remainSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function endTimeDisplay(timeStamp) {
  const endTime = new Date(timeStamp);
  const hours = endTime.getHours();
  const minutes = endTime.getMinutes();
  endTimer.textContent = `Will be back At ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
