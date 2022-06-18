const secHand = document.querySelector(".sec-hand");
const minHand = document.querySelector(".min-hand");
const hrHand = document.querySelector(".hr-hand");
function setDate() {
  const now = new Date();

  const sec = now.getSeconds();
  const secDeg = (sec / 60) * 360 + 90;
  secHand.style.transform = `rotate(${secDeg}deg)`;

  const min = now.getMinutes();
  const minDeg = (min / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minDeg}deg)`;

  const hr = now.getHours();
  const hrDeg = (hr / 12) * 360 + 90;
  hrHand.style.transform = `rotate(${hrDeg}deg)`;
}
setInterval(setDate, 1000);
