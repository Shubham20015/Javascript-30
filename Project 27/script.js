const slider = document.querySelector(".items");
let isClicked = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isClicked = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseup", () => {
  isClicked = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseleave", () => {
  isClicked = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isClicked) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});
