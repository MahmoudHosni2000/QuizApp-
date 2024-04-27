//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".container .btn1");
const continue_btn = document.querySelector(".container .btn2");
const quiz_box = document.querySelector(".quiz-box");
const timeCount = document.querySelector(".timer-sec");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time-text");
const option_list = document.querySelector(".option-list");

//Once clicking on Start Button
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //Show the info box
  timeText.textContent = "Time Left"; //change the text of timeText to Time Left
};

//Once clicking on Exit Button
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //Hide the info box
};
//Once clicking on Continue Button
continue_btn.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //Show the quiz box
  ShowQuestions(que_count);
  QueCounter(que_numb);
  startTimer(timeValue);
  startTimerLine(0);
};
let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = document.querySelector(".result-box .btn1");
const quit_quiz = document.querySelector(".result-box .btn2");



restart_quiz.onclick = () => {
  result_box.classList.remove("activeResult"); // hide result box
  quiz_box.classList.add("activeQuiz"); // show quiz box
  que_count = 0; // reset question count
  que_numb = 1; // reset question number
  userScore = 0; // reset user score
  widthValue = 0; // reset timer bar width
  clearInterval(counter); // clear timer interval
  clearInterval(counterLine); // clear timer line interval

  // Reset the question counter and timer text
  QueCounter(que_numb);
  timeText.textContent = "Time Left";

  // Clear any tick or cross icons from previous answers
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.classList.remove("correct", "incorrect", "disabled");
    option.textContent = ""; // Remove any icons
  });

  // Enable answer options
  const optionList = document.querySelector(".option-list");
  optionList.classList.remove("disabled");

  // Hide the "Next" button
  next_btn.style.display = "none";

  // Show the first question
  ShowQuestions(que_count);

  // Start the timer and timer line
  startTimer(timeValue);
  startTimerLine(widthValue);
};


quit_quiz.onclick = () => {
  window.location.reload();
};



//Once clicking on Next button
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    ShowQuestions(que_count);
    QueCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.style.display = "none";
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};

//import questions and options from array
function ShowQuestions(index) {
  const que_text = document.querySelector(".que-text");
  const option_list = document.querySelector(".option-list");

  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)"); //"onclick" used to detect the clicked item + "this" refers to the current clicked item
  }
}
let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon =
  '<div class="icon click"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  const option_list = document.querySelector(".option-list");
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  const allOptions = option_list.children.length;
  if (userAns === correctAns) {
    userScore++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    //if answers is incorrect then automatically selected the correct answer
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        //if he found the correct answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to matched option
      }
    }
  }
  //Once user selected disabled all options
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.style.display = "block";
}

function showResult() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = document.querySelector(".score-text");
  if (userScore > 3) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>and congrats! , You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>and nice , You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>and sorry , You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}


function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeText.textContent = "Time Off";

      let correctAns = questions[que_count].answer;
      const allOptions = option_list.children.length;
      //if answers is incorrect then automatically selected the correct answer
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          //if he found the correct answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); //adding tick icon to matched option
        }
      }
      //Once user selected disabled all options
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.style.display = "block";
    }
  }
}

// Static Progress bar
// function startTimerLine(time) {
//   counterLine = setInterval(timer, 29);
//   function timer() {
//     time += 1; //upgrading time value with 1
//     time_line.style.width = time + "px"; //increasing width of time_line with px by time value
//     if (time > 549) {
//       //if time value is greater than 549
//       clearInterval(counterLine); //clear counterLine
//     }
//   }
// }

// Dynamic Progress bar
function startTimerLine(time) {

  counterLine = setInterval(timer, 1000);
  function timer() {
    time += 1; //upgrading time value with 1
    const widthPercentage = (time / timeValue) * 100;
    time_line.style.width = widthPercentage + "%"; //increasing width of time_line with px by time value
    if (widthPercentage >= 100) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}


function QueCounter(index) {
  const bottom_ques_counter = document.querySelector(".total-que");
  let totalQuesCountTag =
    "<span><p>" +
    index +
    "</p>Of<p>" +
    questions.length +
    "</p>Question</span>";
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}

