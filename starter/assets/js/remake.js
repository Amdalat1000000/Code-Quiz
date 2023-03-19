var startBtn = document.getElementById("start");

var startScreen = document.getElementById("start-screen");
var quizScreen = document.getElementById("questions");
var feedback = document.getElementById("feedback");

var timeRemaining = 60;
var currentQuestionIndex = 0;
var questionList = [
    {
        question: "How are you?",
        choices: ["good", "bad", "great", "tired"],
        answer: "good"
    },
    {
        question: "Where are you?",
        choices: ["here", "there", "then", "dog"],
        answer: "there"
    },
]

startBtn.addEventListener("click", startQuiz);

function checkAnswer(event) {
    var selectedChoice = event.target.textContent;
    var correctAnswer = questionList[currentQuestionIndex].answer;
    
    if (selectedChoice === correctAnswer) {
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Wrong!";
        timeRemaining -= 10;
    }


    currentQuestionIndex++;
    

    if (currentQuestionIndex < questionList.length) {
        questionShow();
    } else {
        quizEnd();
    }
}

function startQuiz() {
    startScreen.setAttribute("class", "hide");
    quizScreen.setAttribute("class", "");
    timerStarts();
    questionShow();

}

var quizInterval;
function timerStarts() {
    quizInterval = setInterval(function() {
        timeRemaining--;
        document.getElementById("time").textContent = timeRemaining;

        //when does our quiz end?
        if(timeRemaining <=0) {
            clearInterval(quizInterval);
        }
    }, 1000)
}



function questionShow() {
    document.getElementById("question-title").textContent = questionList[currentQuestionIndex].question;

    var choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    for(i=0; i<questionList[currentQuestionIndex].choices.length; i++){
        var newBtn = document.createElement("button");
        newBtn.textContent = questionList[currentQuestionIndex].choices[i];
    
        newBtn.addEventListener("click", checkAnswer);
        choicesContainer.append(newBtn);
    }
        
}

function quizEnd() {
        // Stop the timer
        clearInterval(quizInterval);
      
        // Hide the quiz screen and show the feedback screen
        quizScreen.setAttribute("class", "hide")
        feedbackScreen = document.getElementById("end-screen");
        feedbackScreen.setAttribute("class", "");
      
        // Show the final score
        var finalScore = timeRemaining;
        var scoreElement = document.getElementById("final-score");
        scoreElement.textContent = finalScore;
}

function submitInitials() {
    var initials = document.getElementById("initials").value;
    console.log(initials)

    var highscores = [];
    if(localStorage.getItem("highscores")) {
        highscores = JSON.parse(localStorage.getItem("highscores"))
    }

    var scoreToAdd = timeRemaining + " - " + initials;
    console.log(scoreToAdd)

    highscores.push(scoreToAdd);
    localStorage.setItem("highscores", JSON.stringify(highscores))

    location.replace("./highscores.html")
}

document.getElementById("submit").addEventListener("click", submitInitials)
startBtn.addEventListener("click", startQuiz)