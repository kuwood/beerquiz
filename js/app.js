var fermenting = {
  name:"fermenting",
  question: "Are Ales generally brewed with top or bottom fermenting yeast?",
  answers: ["The Middle","The bottom","The top","Throughout the wart"],
  num:0,
  answer:"2"
}

var manufacturer = {
  name:"manufacturer",
  question: "What is the name of largest beer manufacturer in USA?",
  answers: ["MillerCoors","Anheuser Busch","Pabst","Heineken USA"],
  num:1,
  answer:"1"
}

var pint = {
  name:"pint",
  question: "How many ounces are in a typical pint in America?",
  answers: [16,20,12,22],
  num:2,
  answer:"0"
}

var ibu = {
  name:"ibu",
  question: "What does IBU stand for?",
  answers: ["International Brewing Union","Internal Barley Unison","Invitational Beer University","International Bittering Units"],
  num:3,
  answer:"3"
}

var oldest = {
  name:"oldest",
  question: "Which is the oldest operating brewery in the US?",
  answers: ["Pabst Brewing Company","Yuengling","Anheuser-Busch","Miller Brewing Company"],
  num:4,
  answer:"1"
}

var questionArray = [fermenting,manufacturer,pint,ibu,oldest];
var onQuestion = 0;
var score = 0;

function appendSubmit() {
  $('.answers').append('<div class="buttonWrap"><button class="btn" id="submitAnswer">Submit</button></div>')
}

function clear() {
  $('.titleBar').children().remove();
  $('section').children().remove();
  $('.buttonWrap').remove();
}


function populateAnswers(obj) {
  var num = 0;
  obj.answers.forEach(function(i,num) {
    $('.answers ul').append('<li><input type="radio" name="' + obj.name + '" value="'+ num++ +'" class="required" /><label for="' + obj.name + '">' + i + '</label></li>');
  })
}

function pageArrival() {
  $('.titleBar').append('<ul></ul>');
  $('.titleBar ul').append('<h1 id="splashTitle">Beer Quiz</h1>');
}

function newQuestion(obj) {
  $('.titleBar').append('<ul></ul>');
  $('.titleBar ul').append('<h1 id="questionNum">Question ' + (onQuestion + 1) + ' of ' + questionArray.length + '</h1>');
  $('.questions').append('<ul></ul>');
  $('.questions ul').append('<li>' + obj.question + '</li>');
  $('.answers').append('<ul></ul>');
  populateAnswers(obj);
}

function answerSubmit() {
  var userAnswer = $("input[type='radio']:checked").val()
  if (userAnswer === undefined) {
    alert("You must make a selection.");
    return;
  }
  if (userAnswer === questionArray[onQuestion].answer) {
    score += 1;
    console.log("correct!")
  } else {
    console.log("wrong!");
  }
  return true;
}

function nextQuestion() {
  if (onQuestion < questionArray.length - 1) {
    clear();
    onQuestion += 1;
    newQuestion(questionArray[onQuestion]);
  } else {
    clear();
    onQuestion += 1;
    showResults();
    appendPlayAgain();
  }
}

function showResults() {
  $('.titleBar').append('<ul></ul>');
  $('.titleBar ul').append('<h1 id="resultsTitle">Results:</h1>');
  $('.completed').append('<ul class="results"></ul>');
  $('.completed ul').append('<li>You answered ' + score + ' out of 5 correct!</li>');
}

function appendPlayAgain() {
  $('.completed').append('<div class="buttonWrap"><button class="btn" id="playAgain">Take it again!</button></div>')
}

$(document).ready(function(){
  pageArrival();
  $('#startquiz').click(function() {
    clear();
    newQuestion(fermenting);
    appendSubmit();
  })
  $('.answers').on("click","#submitAnswer",function() {
    if (answerSubmit() === true) {
      nextQuestion();
      if (onQuestion <= 4) {
        appendSubmit();
      }
    }
  })
  $('.completed').on("click","#playAgain",function() {
    onQuestion = 0;
    score = 0;
    clear();
    newQuestion(fermenting);
    appendSubmit();
  })
})
