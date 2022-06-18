function playsound(e) {
  const audio = document.querySelector(
    `audio[data-type="${e.key.charCodeAt(0)}"]`
  );
  const key = document.querySelector(
    `.key[data-type="${e.key.charCodeAt(0)}"]`
  );
  if (!audio) return; // Stop the function from running all together
  audio.currentTime = 0; // Rewind to the start
  audio.play();
  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  // console.log(e.propertyName);
  e.target.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playsound);
