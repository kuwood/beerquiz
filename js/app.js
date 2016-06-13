var fermenting = {
  question: "Are Ales generally brewed with top or bottom fermenting yeast?",
  answers: ["The Middle","The bottom","The top","Throughout the wart"],
  num:0,
  answer:"2"
}

var manufacturer = {
  question: "What is the name of largest beer manufacturer in USA?",
  answers: ["MillerCoors","Anheuser Busch","Pabst","Heineken USA"],
  num:1,
  answer:1
}

var pint = {
  question: "How many ounces are in a typical pint in America?",
  answers: [16,20,12,22],
  num:2,
  answer:0
}

var ibu = {
  question: "What does IBU stand for?",
  answers: ["International Brewing Union","Internal Barley Unison","Invitational Beer University","International Bittering Units"],
  num:3,
  answer:3
}

var oldest = {
  question: "Which is the oldest operating brewery in the US?",
  answers: ["Pabst Brewing Company","Yuengling","Anheuser-Busch","Miller Brewing Company"],
  num:4,
  answer:1
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
    $('.answers ul').append('<li><input type="radio" name="fermAnswers" value="'+ num++ +'" /><label for="fermAnswers">' + i + '</label></li>');
  })
}

function pageArrival() {
  $('.titleBar').append('<ul></ul>');
  $('.titleBar ul').append('<h1 id="splashTitle">Beer Quiz</h1>');
}

function newQuestion(obj) {
  $('.titleBar').append('<ul></ul>');
  $('.titleBar ul').append('<h1 id="questionNum">Question ' + (questionArray.indexOf(obj) + 1) + ' of ' + questionArray.length + '</h1>');
  $('.questions').append('<ul></ul>');
  $('.questions ul').append('<li>' + obj.question + '</li>');
  $('.answers').append('<ul></ul>');
  populateAnswers(obj);
}

function answerSubmit() {
  var userAnswer = $("input[type='radio']:checked").val()
  if (userAnswer === questionArray[onQuestion].answer) {
    score += 1;
    console.log("correct!")
  } else {
    console.log("wrong!");
  }
}

function nextQuestion() {
  if (onQuestion === 0) {
    clear();
    newQuestion(manufacturer);
    onQuestion += 1;
  } else if (onQuestion === 1) {
    clear();
    newQuestion(pint);
    onQuestion += 1;
  } else if (onQuestion === 2) {
    clear();
    newQuestion(ibu);
    onQuestion += 1;
  } else if (onQuestion === 3) {
    clear();
    newQuestion(oldest);
    onQuestion += 1;
  }
}

$(document).ready(function(){
  pageArrival();
  $('#startquiz').click(function() {
    clear();
    newQuestion(fermenting);
    appendSubmit();
  })
  $('.answers').on("click","#submitAnswer",function() {
    answerSubmit();
    nextQuestion();
    if (onQuestion <= 4) {
      appendSubmit();
    }
  })
})
