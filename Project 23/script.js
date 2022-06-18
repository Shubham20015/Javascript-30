const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropdown = document.querySelector("#voices");
const optionsBar = document.querySelectorAll('[type="range"], [name="text"]');
const speakBtn = document.querySelector("#speak");
const stopBtn = document.querySelector("#stop");
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voiceDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voiceDropdown.addEventListener("change", setVoice);
optionsBar.forEach((option) => option.addEventListener("change", setOption));
speakBtn.addEventListener("click", toggle);
stopBtn.addEventListener("click", () => toggle(false));
