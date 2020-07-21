
// JS Variables
// Color Variables
var buttonColors = ["red", "blue", "green", "yellow"];

// Patterns (Game & User)
var gamePattern = [];
var userClickedPattern = [];

// Checking if game has started or not
var started = false;
var level = 0;

// Detects which button has been pressed
$(".btn").click(function() {

  // $(this) will select whatever object is clicked
  var userChosenColor = $(this).attr("id");

  // Will add object clicked to User Pattern
  userClickedPattern.push(userChosenColor);

  // Area where function will play Sound, animate what you click and check if answer is correct
  playSound(userChosenColor);
  animatePress(userChosenColor);


  checkAnswer(userClickedPattern.length - 1);
});

// Detecting A being pressed
$(".goButton").click(function(event) {

  if (!started) {
    $("h1").text("Level " + level);
    $(".explainer").hide();

    nextSequence();
    started = true;


  }


});

// Checking Answer is correct
function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("GAME OVER, PRESS RESTART");
    $("h2").text("Struggling? Check the rules again!")
    $(".goButton").text("RESTART");
    $(".explainer").show();

    startOver();


  }

}
// Start Again after Game Over
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];

}

// Creates Sequence
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);



}



// Plays sound according to button pressed
function playSound(name) {

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}

// Animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
