$(document).keydown(function(){
  if(!started){
    correctArrey= [];
    userClickedPattern = [];
    started=true;
    level=-1;
    startGame();
  }
});
var correctArrey = [];
var buttonColors = ["green", "red", "yellow","blue"];
var userClickedPattern = [];
var currentLevel=0;
var started = false;
var level = -1;

function nextBtn(){
  var number = Math.random()*4;
  number= Math.floor(number);
  return number;
}

function addToArrey(cA){
  var adding = buttonColors[nextBtn()];
  cA.push(adding);
  setTimeout(function(){
      pressBtn(adding); }, 500);
}

function pressBtn(btnColor){
  playSound(btnColor);
  $("."+btnColor).addClass("pressed");
  $("."+btnColor).fadeOut("fast").fadeIn("fast");
  setTimeout(function(){$("."+btnColor).removeClass("pressed"); }, 100);
}

function playSound(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

function checkAnswer(currentLvl){

    if (correctArrey[currentLvl]===userClickedPattern[currentLvl]){
      if (userClickedPattern.length === correctArrey.length){
        startGame();
      }
      console.log("correct");}
    else{
      console.log("wrong");
      started= false;
      gameOver();
      return false;}
    return true;
}

function startGame(){
  userClickedPattern=[];
  addToArrey(correctArrey);
  $("#level-title").html("Level "+(level+1));
  level++;

}

function gameOver(){
  var wrongSound = "wrong";
  playSound(wrongSound);
  $("body").addClass("game-over");
  $("#level-title").html("Game over! <br> Press any key to restart!");
  setTimeout(function(){$("body").removeClass("game-over"); }, 500);
}


$(".btn").click(function(){
  if(started===false){return;}
  var userClickedBtn = jQuery(this).attr("id");

  pressBtn(userClickedBtn);
  userClickedPattern.push(userClickedBtn);

  checkAnswer(userClickedPattern.length-1);

});
