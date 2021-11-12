//*Variables: These are defined further in the code and connect it with the HTML

var cardEl = $(".card-body");
var timerEl = $(".timer-count");
var startButton = $("#start-button");
var scoreButton = $("#score-button").css("background-color", "blue");
var nextButton = $(".btn-next");
var incorrectAns = $(".false");
var correctAns = $(".true");
var scoreList = $("#high-scores");

//Establishes a base index for the score and the question number (so a loop can be run)

var scoreCounter = 0;
var currentQuestion = 0;

//This stores the scores to localStorage for comparison purposes
var storedScore = JSON.parse(localStorage.getItem("scores")) || [];

$(".questions").hide();
$(".game-over").hide();
$(scoreButton).hide();
$(scoreList).hide();

//*Functions: These execute the quiz using the above variables; they're called by event listeners (below)

/*Selects questions to be rendered to the screen from the array. This function is 
called when the user selects ANY answer*/
function nextQuestion() {
  $("#q" + currentQuestion).hide();
  $("#q" + (currentQuestion + 1)).show();
  currentQuestion += 1;
}

//This function removes time from the clock if the users selects an incorrect answer
function incorrectAnswer() {
  timerCount -= 3;
  console.log("wrong");
  nextQuestion();
}

//This function advances the question without a time penalty if the user selects the correct answer
function correctAnswer() {
  console.log("right");
  nextQuestion();
}

// The startQuiz function is called when the start button is clicked (total time: 30 secs)
function startQuiz() {
  timerCount = 30;
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
    timerCount--;
    timerEl.text(timerCount);
    if (timerCount === 0) {
      // This clears the timer interval when it reaches "0"
      clearInterval(timer);
      //Function calling for the end of the game
      gameOver();
    }
    //Time, in milliseconds, between countdown (1-sec intervals)
  }, 1000);
}

// The gameOver function is called when the timer reaches "0"
function gameOver() {
  //Various questions and buttons are hidden and then revealed at this point
  $(".questions").hide();
  $(".game-over").show();
  $(startButton).hide();
  $(scoreButton).show();
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
  $(scoreButton).hide();
  $(startButton).show();
  //A button appears giving the player the opportunity to save their score
  var initButton = $("<button>").append("Save my score");
  initButton.on("click", saveScore);
  //The score for the current game is logged (locally), and the player is given the option of saving it
  cardEl.append(
    "Your score was: ",
    scoreCounter,
    $("<br>"),
    "Click to enter score: ",
    initButton
  );
  //Function within a function: This saves the player's score and their initials (user-entered)
  function saveScore() {
    var scoreObject = {
      initials: prompt("Enter your initials:"),
      score: scoreCounter,
    };
    //The score and initials are then pushed back out via renderScore (above)
    storedScore.push(scoreObject);
    localStorage.setItem("scores", JSON.stringify(storedScore));
    renderScores();
  }
}

//*Event listeners: These attach to the buttons and execute the above functions when clicked
startButton.on("click", startQuiz);
incorrectAns.on("click", incorrectAnswer);
correctAns.on("click", correctAnswer);
scoreButton.on("click", renderScores);
