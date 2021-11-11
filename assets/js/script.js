//one question, stop clock if answer is incorrect
//localStorage log answer

var cardEl = $(".card-body");
var timerEl = $(".timer-count");
//var timerElement
var startButton = $("#start-button");
var nextButton = $(".btn-next");

$(".questions").hide();

//Selects questions to be rendered to the screen from the array
function renderQuestion() {
  // quizEl = [];
  // // Uses loop to push questions to quiz array
  // for (var i = 0; i < questions.length; i++) {
  //   quizEl.push(questions);
  //   cardEl.append(quizEl);
  // }
  $("#q1").show();
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

//The nextQuestion function is called when the user selects an answer
function nextQuestion() {
  //If $("true") {
  //   timerCount -= 3;
  //   }
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
nextButton.on("click", nextQuestion);

/*
foo.on("click", func()) {
  //click also starts timer -- separate function
  questions1="show"
  func() {
    if [var=answer]=true
    //give user a point
  } else {
    if [var=answer]=false
    //subtract time
  }
  console.log("answer")
  questions1="hide"
  questions2="show"
};
*/

/*
for question in questions:
  - write question to html
  - wait for user input
  - decide whether user input is good
  - update score
*/
