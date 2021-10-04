const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionNumber = document.getElementById("question-counter");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progress-width");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
// let widthPercentage = 0;

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    //this is an HTTP response, we want JSON data out of that
    // console.log(res.json());
    return res.json();
  })
  .then((loadedQuestions) => {
    //wait for the questions to load up then startGame()
    // console.log(loadedQuestions);
    // questions = loadedQuestions;
    // console.log(loadedQuestions.results);

    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      //to add correct answer in randomly between incorrect_answers
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

const MAX_QUESTIONS = 5;
const CORRECT_BONUS = 10;

const startGame = () => {
  //to make sure it does start with 0
  questionCounter = 0;
  //spread operator
  availableQuestions = [...questions];
  score = 0;
  //console.log(availableQuestions);
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

const getNewQuestion = () => {
  //
  //check if any questions are left and if counter has reached max_questions
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("recentScore", score);
    //go to end page.
    return window.location.assign("./endPage.html");
  }
  //start the game, increment to 1, add value to question number.
  questionCounter++;
  questionNumber.innerText = `${questionCounter} of ${MAX_QUESTIONS}`;

  //progressBar
  const widthPercentage = (questionCounter / MAX_QUESTIONS) * 100;
  setTimeout(() => {
    incrementProgressBar(widthPercentage);
  }, 200);
  //get question index to randomly choose question from the available questions array
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);

  //currentQuestion will be 'availableQuestion[randomIndex]'
  currentQuestion = availableQuestions[questionIndex];
  //console.log(currentQuestion);
  question.innerText = currentQuestion.question;
  //console.log(questionIndex);

  //   console.log(choices[0]);
  choices.forEach((choice) => {
    // console.log(choice.dataset["number"]);
    // adding text to choices with the help of data-number
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    acceptingAnswers = true;
  });

  // take out the question we just used out off the array
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
  //console.log(availableQuestions);
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // console.log(e.target);
    // if we are not accepting answers
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    // console.log(selectedAnswer);

    const classToApply =
      selectedAnswer == currentQuestion.answer
        ? "right-answer"
        : "wrong-answer";

    if (classToApply === "right-answer") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
    // console.log(selectedAnswer.dataset["number"]);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

const incrementProgressBar = (widthPercentage) => {
  progressBar.style.width = `${widthPercentage}%`;
  widthPercentage += 25;
};
//

//if we answer question right
// const expectedAnswer(currentQuestion.answer)
//figure out: if(selectedANswer.dataset['number'] === currentQuestion.answer)
//score += BONUS_POINTS;
//console.log('name' ur answer is right)
// create element('p').innerText Right Answer

// Score counter: 0
// every right answer +10
// figure out: if(selectedANswer.dataset['number'] === currentQuestion.answer)
