//get the high scores
//is an array, containing object
//name and score property
//map()
//innerHTML

const list = document.getElementById("highScoresList");
const highScores = JSON.parse(window.localStorage.getItem("highScores") || []);

const highScoreList = highScores
  .map((score) => {
    return `<li class="high-score"> ${score.name.toUpperCase()} - ${
      score.score
    }</li>`;
  })
  .join("");

list.innerHTML = highScoreList;
// console.log(highScores);
