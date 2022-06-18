const body = document.querySelector("body");
const calBtn = document.querySelector(".calculate");
const time = [...document.querySelectorAll("[data-time]")];

const calMedTime = time
  .map((timeDuration) => timeDuration.dataset.time)
  .map((duration) => {
    const [mins, secs] = duration.split(":").map(parseFloat);
    return mins * 60 + secs;
  })
  .reduce((total, videoDuration) => total + videoDuration);

let secondsLeft = calMedTime;

const totalHours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const totalMins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

// console.log(
//   `Total Videos Duration: ${totalHours < 10 ? "0" + totalHours : totalHours}:${
//     totalMins < 10 ? "0" + totalMins : totalMins
//   }:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`
// );

calBtn.addEventListener("click", () => {
  body.innerHTML = `
    <h1>
    Total Videos Duration: ${totalHours < 10 ? "0" + totalHours : totalHours}:${
    totalMins < 10 ? "0" + totalMins : totalMins
  }:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}
  <h1>
  <button onclick="window.location.reload()">Go Back</button>
  `;
});
