//one question, stop clock if answer is incorrect
//localStorage log answer

var cardEl = $(".card-body");
var timerEl = $(".timer-count");
//var timerElement
var startButton = $("#start-button");
var scoreButton = $("#score-button").css("background-color", "blue");
var nextButton = $(".btn-next");
var incorrectAns = $(".false");
var correctAns = $(".true");
var scoreList = $("#high-scores");

var scoreCounter = 0;
var currentIndex = 0;

//This stores the scores to localStorage for comparison purposes
var storedScore = JSON.parse(localStorage.getItem("scores")) || [];

$(".questions").hide();
$(".game-over").hide();
$(scoreButton).hide();
$(scoreList).hide();

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
  //RESET TIMER TO 30
  timerCount = 5;
  // Prevents start button from being clicked during quiz (re-setting time)
  startButton.attr("disabled", true).hide();
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
  $(".questions").hide();
  $(".game-over").show();
  $(startButton).hide();
  $(scoreButton).show();
  enterScore();
}

function renderScores() {
  $(scoreList).show().empty();
  if (storedScore.length === 0) {
    scoreList.append("Please play the quiz first!");
  } else {
    for (var i = 0; i < storedScore.length; i++) {
      var newLi = $("<li>");
      newLi.text(storedScore[i].initials + " ----- " + storedScore[i].score);
      scoreList.append(newLi);
    }
  }
}

function enterScore() {
  $(scoreButton).hide();
  $(startButton).show();
  $(".game-over").hide();
  var initButton = scoreList.append("button", "Save my score");
  initButton.on("click", saveScore);
  cardEl.text(
    "Your score was: " +
      scoreCounter +
      "\n\n Click to enter score: " +
      initButton
  );
  function saveScore() {
    var scoreObject = {
      initials: userInitials,
      score: scoreCounter,
    };
    storedScore.push(scoreObj);
    localStorage.setItem("scores", JSON.stringify(storedScore));
  }
  renderScores();
}
// **TO DO: SHOW START BUTTON AGAIN AT END OF GAME**
//startButton.style.display = "hide";

// Attach event listener to start button to call startQuiz function on click
startButton.on("click", startQuiz);
incorrectAns.on("click", incorrectAnswer);
correctAns.on("click", correctAnswer);
scoreButton.on("click", renderScores);
