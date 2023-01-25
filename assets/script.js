
let questions = [
  {
      question: "Scott Pilgrim is the _________ of the earth.",
      choices: ["1. Salt", "2. Scum", "3. King", "4. OR is he both the salt AND the scum"],
      answer: "4. OR is he both the salt AND the scum"
  },  {
      question: "________ mosquitos are the only ones that suck blood.",
      choices: ["1. Male", "2. Female", "3. Priority mail", "4. Goth"],
      answer: "2. Female"
  },  {
      question: "_____ _______'s skin sparkles like diamonds.",
      choices: ["1. Hello Kitty", "2. Bill Clinton", "3. Edward Cullen", "4. Tony Soprano",],
      answer: "3. Edward Cullen"
  },  {
      question: "Lost in __________.",
      choices: ["1. Elation", "2. Translation", "3. Menstruation", "4. Caucasian"],
      answer: "2. Translation"
  }
];

var timer = document.getElementById("clock");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("startBtn");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choice1 = document.getElementById("btn0");
var choice2 = document.getElementById("btn1");
var choice3 = document.getElementById("btn2");
var choice4 = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitBtn = document.getElementById("submitBtn");
var initialsIn = document.getElementById("initialsIn");
var bigDiv = document.getElementById("bigDiv");

var hsDiv = document.getElementById("hsDiv");
var score = document.getElementById("score");

var backBtn = document.getElementById("backBtn");
var clearBtn = document.getElementById("clearBtn"); 
var viewHighscore = document.getElementById("viewHighscore");
var listHighscores = document.getElementById("listHighscores");

var rightAns = 0;
var questionNum = 0;
var scoreResult = 0;
var questionIndex = 0;



startQuizBtn.addEventListener("click", newQuiz);

function newQuiz() {
  questionIndex = 0;
  totalTime = 40;
  timeLeft.textContent = totalTime;
  initialsIn.textContent = "";
  rightAns = 0;

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function() {
      totalTime--;
      timeLeft.textContent = totalTime;
      if(totalTime <= 0) {
          clearInterval(startTimer);
          if (questionIndex < questions.length - 1) {
              gameOver();
          }
      }
  },1000);

  showQuiz();
};

choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choice1.textContent = questions[questionIndex].choices[0];
  choice2.textContent = questions[questionIndex].choices[1];
  choice3.textContent = questions[questionIndex].choices[2];
  choice4.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {

  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
      rightAns++;
      answerCheck.textContent = "You got it";
  } else {
      totalTime -= 10;
      timeLeft.textContent = totalTime;
      answerCheck.textContent = "WRONG LOL, LOSER -- " + questions[questionIndex].answer;
  }

  questionIndex++;
  if (questionIndex < questions.length) {
      nextQuestion();
  } else {
      gameOver();
  }
}

function choose1() { checkAnswer(0); }
function choose2() { checkAnswer(1); }
function choose3() { checkAnswer(2); }
function choose4() { checkAnswer(3); }

function gameOver() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timesUp.style.display = "block";
  console.log(rightAns);
  score.innerHTML= rightAns;
};


function showScores() {
    listHighscores.innerHTML = "";
    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    hsDiv.style.display = "block";
   
    var savedScores = localStorage.getItem("highscores");
   
    
    if (savedScores === "") {
        return;
    }
        
    var storedHighScores = JSON.parse(savedScores);
    var newHighscore = [];
    for (let i = 0; i < storedHighScores.length; i++) {
        var newHighscore = document.createElement("p");
        newHighscore.innerHTML = storedHighScores[i].initials + " : " + storedHighScores[i].score;
        listHighscores.appendChild(newHighscore);
    }
  };
  
function storeHighScores() {
    
    if (initialsIn.value === "") {
        alert("C'mon, you have to type something.");
        return;
    } 
  
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    hsDiv.style.display = "block";   
  
    var savedScores = localStorage.getItem("highscores");
    var scoresArray;
  
    if (savedScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedScores);
    }
  
    var userScore = {
        initials: initialsIn.value,
        score: rightAns
    };
  
    scoresArray.push(userScore);
    initialsIn.value = "";
    
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("highscores", scoresArrayString);

    showScores();
    
  };

submitBtn.addEventListener("click", function(){ 
  storeHighScores();
});
viewHighscore.addEventListener("click", function(event) { 
  showScores(event);
});

backBtn.addEventListener("click", function() {
  startDiv.style.display = "block";
  hsDiv.style.display = "none";
});

clearBtn.addEventListener("click", function(){
  window.localStorage.removeItem("highscores");
  listHighscores.innerHTML = "Highscores Deleted";
  listHighscores.setAttribute("style", "font-weight: bold")
});