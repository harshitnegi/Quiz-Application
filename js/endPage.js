const submitBtn = document.getElementById("saveScoreBtn");
const input = document.getElementById("username");
const finalScore = document.getElementById("finalScore");
const recentScore = localStorage.getItem("recentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGHSCORE = 5;

if (recentScore) {
  finalScore.innerText = recentScore;
} else {
  finalScore.innerText = "0";
}

input.addEventListener("keyup", () => {
  submitBtn.disabled = !input.value;
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  input.focus();

  //localStorage.setItem(input.value, recentScore);
  const score = {
    score: recentScore,
    name: input.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGHSCORE);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  //go back home
  window.location.assign("./index.html");
});

// if (input.value) {
//   submitBtn.disabled = false;
// }

//split the high score
//do the sorting
//maximum score allowed, 5.
//splice the highScore at index 5
