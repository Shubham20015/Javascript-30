const links = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const navTop = document.querySelector(".top");

function handleEnter() {
  this.classList.add("trigger-enter");
  setTimeout(
    () =>
      this.classList.contains("trigger-enter") &&
      this.classList.add("trigger-enter-active"),
    150
  );
  background.classList.add("open");

  const dropdown = this.querySelector(".dropdown");
  const dropNavCoords = dropdown.getBoundingClientRect();
  const navCoords = navTop.getBoundingClientRect();

  const coords = {
    width: dropNavCoords.width,
    height: dropNavCoords.height,
    top: dropNavCoords.top - navCoords.top,
    left: dropNavCoords.left - navCoords.left,
  };

  background.style.setProperty("width", `${coords.width}px`);
  background.style.setProperty("height", `${coords.height}px`);
  background.style.setProperty(
    "transform",
    `translate(${coords.left}px, ${coords.top}px)`
  );
}

function handleLeave() {
  this.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
}

links.forEach((link) => link.addEventListener("mouseenter", handleEnter));
links.forEach((link) => link.addEventListener("mouseleave", handleLeave));
