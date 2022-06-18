const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  this.classList.add("open");
  this.classList.add("open-active");
}

function toggleRemove() {
  this.classList.remove("open-active");
  this.classList.remove("open");
}

panels.forEach((panel) => panel.addEventListener("mouseover", toggleOpen));
panels.forEach((panel) => panel.addEventListener("mouseleave", toggleRemove));
