//one question, stop clock if answer is incorrect
//localStorage log answer

var cardEl = $(".card-body");
var timerEl = $(".timer-count");
//var timerElement
var startButton = $("#start-button");
var nextButton = $(".btn-next");
var incorrectAns = $(".false");
var correctAns = $(".true");

$(".questions").hide();

//Selects questions to be rendered to the screen from the array
function renderQuestion() {
  $("#q1").show();
  //   function nextQuestion () {
  //     If $(".correct")
  //   }
}

//The nextQuestion function is called when the user selects an answer
function incorrectAnswer() {
  //   timerCount -= 3;}
  // $("#q1").hide();
  // $("#q2").show();
  console.log("wrong");
}

function correctAnswer() {
  // d
  // $("#q1").hide();
  // $("#q2").show();
  console.log("right");
}

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  //do I need to establish something that shows the game isn't already over here?
  timerCount = 30;
  //Define me
  startTimer();
  renderQuestion();
}

// The startTimer function starts and stops the timer
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerEl.text(timerCount);
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

// The gameOver function is called when timer reaches 0
function gameOver() {
  //wordBlank.textContent = "GAME OVER";
  //startButton.style.display = "show";
  //Define me
  //setScore();
}

// **TO DO: SHOW START BUTTON AGAIN AT END OF GAME**
//startButton.style.display = "hide";

// Attach event listener to start button to call startQuiz function on click
startButton.on("click", startQuiz);
incorrectAns.on("click", incorrectAnswer);
correctAns.on("click", correctAnswer);
