alert(
  "Our Speech Recognition AI 🤖 is not up to mark but we improve with some time ⌛."
);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
// recognition.lang = "en-US";

const lyrics = document.querySelector(".originalText");
const matchingText = document.querySelector(".matchingWords");
const startBtn = document.querySelector(".startBtn");
const stopBtn = document.querySelector(".stopBtn");

startBtn.addEventListener("click", () => {
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    if (e.results[0].isFinal) {
      lyrics.textContent += transcript;
      lyrics.textContent += ", ";
      let lastWord = transcript.split(" ").splice(-1)[0];
      fetch(`https://api.datamuse.com/words?rel_rhy=${lastWord}`)
        .then((res) => res.json())
        .then((data) => {
          const maxWords = data.length > 40 ? 26 : data.length;
          const rhymingWords = data
            .slice(0, maxWords)
            .map((ryhme) => ryhme.word)
            .join(", ");
          matchingText.innerHTML = rhymingWords;
        });
    }
  });

  recognition.addEventListener("end", recognition.start);

  recognition.start();
});

stopBtn.addEventListener("click", () => recognition.abort);
