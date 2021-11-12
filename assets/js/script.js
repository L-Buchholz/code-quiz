//*Variables: These are defined further in the Javascript code and connect it with the HTML

var cardEl = $(".card-body");
var timerEl = $(".timer-count");
var startButton = $("#start-button");
var nextButton = $(".btn-next");
var incorrectAns = $(".false");
var correctAns = $(".true");
var scoreList = $("#high-scores");

//Establishes a base index for the score and the question number (so a loop/repeat quizzes can be run)

var currentQuestion = 0;

//This stores the scores to localStorage for comparison purposes
var storedScore = JSON.parse(localStorage.getItem("scores")) || [];

$(".questions").hide();
$(".game-over").hide();
$(scoreList).hide();

//*Functions: These execute the quiz using the above variables; they're called by event listeners (below)

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  //This resets and clears "Game Over" content upon repeating the quiz
  $(".game-over").hide();
  $(".game-over-content").empty();
  $(scoreList).hide();
  //Timer is set to 15 seconds
  timerCount = 15;
  currentQuestion = 0;
  // Prevents start button from being clicked during quiz (thereby resetting time)
  startButton.attr("disabled", true).hide();
  //Starts the timer for the quiz
  startTimer();
  //Takes the player to the first question
  nextQuestion();
}

// The startTimer function starts and stops the timer
function startTimer() {
  // This sets the timer
  timer = setInterval(function () {
    //Timer is counting down
    timerCount--;
    timerEl.text(timerCount);
    if (timerCount === 0) {
      // This clears the timer interval when it reaches "0"
      clearInterval(timer);
      gameOver();
    }
    //Elapsed time between numbers, in milliseconds, during countdown (1-sec intervals)
  }, 1000);
}

/*Selects questions to be rendered to the screen from the array. This function is 
called when the player selects ANY answer*/
function nextQuestion() {
  //Updates rendered time after question buttons are clicked, including any penalties
  timerEl.text(timerCount);
  $("#q" + currentQuestion).hide();
  $("#q" + (currentQuestion + 1)).show();
  currentQuestion += 1;
  if (currentQuestion > 4) {
    // This clears the timer interval when the player completes all of the questions
    clearInterval(timer);
    gameOver();
  }
}

//This function removes time from the clock if the player selects an incorrect answer
function incorrectAnswer() {
  timerCount -= 3;
  console.log("wrong");
  nextQuestion();
}

//This function advances the question without a time penalty if the player selects the correct answer
function correctAnswer() {
  console.log("right");
  nextQuestion();
}

// The gameOver function is called when the timer reaches "0"
function gameOver() {
  //Various questions and buttons are hidden and then revealed at this point
  $(".questions").hide();
  $(".game-over").show();
  $(startButton).hide();
  //The opportunity for the player to enter their score is called here
  enterScore();
}

//This function ties in with enterScore (below)
function renderScores() {
  //A list of scores is added to the main content area of the page
  $(cardEl).append(scoreList);
  //The score list starts empty by default
  $(scoreList).show().empty();
  //New scores are appended as list items (not defined in the HTML)
  for (var i = 0; i < storedScore.length; i++) {
    var newLi = $("<li>");
    newLi.text(
      "Name: " +
        storedScore[i].initials +
        "  *  " +
        "Score: " +
        storedScore[i].score
    );
    //The list is added to the webpage
    scoreList.append(newLi);
  }
}

function enterScore() {
  $(startButton).show();
  //A button appears, giving the player the opportunity to save their score
  var initButton = $("<button>").append("Save my score");
  $(initButton).css(
    "background-color",
    "rgb(174, 123, 204)",
    "text-align",
    "center",
    "cursor",
    "pointer"
  );
  initButton.on("click", saveScore);
  //The score for the current game is logged (locally), and the player is given the option of saving it
  $(".game-over-content").append(
    "Your score was: ",
    timerCount,
    $("<br>"),
    "Click to enter score: ",
    initButton
  );
  //Function within a function: This saves the player's score and their initials (user-entered)
  function saveScore() {
    var scoreObject = {
      initials: prompt("Enter your initials:"),
      score: timerCount,
    };
    //The score and initials are then pushed back out via renderScore (above)
    storedScore.push(scoreObject);
    localStorage.setItem("scores", JSON.stringify(storedScore));
    renderScores();
    $(initButton).hide();
    // Enables start button again
    startButton.attr("disabled", false).show();
  }
}

//*Event listeners: These attach to the buttons and execute the above functions when clicked
startButton.on("click", startQuiz);
incorrectAns.on("click", incorrectAnswer);
correctAns.on("click", correctAnswer);
