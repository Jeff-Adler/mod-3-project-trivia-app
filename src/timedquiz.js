QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"
FIND_PATH = "find"
SCORE_PATH = "/score"

let correctAnswers = []
let userAnswers = new Array(50);
let score = 0
let questionCounter = 0
let questionsArray = []

const params = getParams(window.location.href);

retrieveQuiz(params)

const answersForm = document.querySelector("#answers-form")

const renderAnswersForm = (answersJson) => {
    answersForm.dataset.question_id = questionCounter
    let answersArr = answersJson["incorrect_answers"]
    const correctAnswer = answersJson["correct_answer"]            
    correctAnswers.push(correctAnswer) //global variable
    answersArr.push(correctAnswer) //local variable
    shuffleArray(answersArr)

    answersForm.innerHTML = `
    <p id="question-text">${answersJson["question"]}</p>

    <input type="radio" class="radio-node" id="q1" name="${questionCounter}" value="${answersArr[0]}">
    <label for="q1">${answersArr[0]}</label><br>

    <input type="radio" class="radio-node" id="q2" name="${questionCounter}" value="${answersArr[1]}">
    <label for="q2">${answersArr[1]}</label><br>

    <input type="radio" class="radio-node" id="q3" name="${questionCounter}" value="${answersArr[2]}">
    <label for="q3">${answersArr[2]}</label><br>
    
    <input type="radio" class="radio-node" id="q4" name="${questionCounter}" value="${answersArr[3]}">
    <label for="q4">${answersArr[3]}</label>
    `
}

const renderTimedQuizQuestions = (questionsHash) => {
    const questionContainer = document.querySelector("#question-container")
    questionContainer.dataset.quiz_id = Object.keys(questionsHash)[0]     //stores quiz_id
    questionsArray = Object.values(questionsHash)[0]
    renderAnswersForm(questionsArray[questionCounter])
    console.log(correctAnswers)
}

const startTimer = () => {
    var totalSeconds = 60;
    var timer = setInterval(setTime, 1000);
    const timerElement = document.querySelector("#timer")
    function setTime() {

        if(totalSeconds === 0 || !(questionCounter < 50)){
            console.log("hit timeout or question max")
            clearInterval(timer)
            stopQuiz()
            reportResults()
            storeScore(document.querySelector("#question-container").dataset.quiz_id)
        }
        --totalSeconds;
        timerElement.innerText = totalSeconds
    }
}

const stopQuiz = () => {
    document.querySelector("#question-container").style.display = "none"
    document.querySelector("#timer-container").style.display = "none"
    document.querySelector("#quiz-time").style.display ="none"
    document.querySelector("#progress-bar-div").style.display ="none"
}

const reportResults = () => {
    const h3 = document.querySelector("h3")
    h3.id = "score-message"
    h3.remove()
    const h1 = document.createElement("h1")
    h1.id = "quiz-completion-header"
    h1.innerText = `Congrats! You got ${score} out of ${questionCounter} questions right.`
    h1.style = "text-align:center"
    document.querySelector("body").prepend(h1)
    const takeQuizLink = document.createElement("div")
    takeQuizLink.id = "take-quiz-link"
    takeQuizLink.innerHTML = `<br><br><br><a href="../index.html">Take another quiz</a>`
    h1.append(takeQuizLink)
    takeQuizLink.style = "text-align:center"
}

const storeScore = (quizID) => {
    option = {
        method: "PATCH",
        headers: {
        "content-type": "application/json",
        "accept": "application/json"
        },
        body: JSON.stringify({
            score: score   
        })
    }
    fetch(QUIZ_URL + quizID + SCORE_PATH, option)
    .then(response => response.json())
    .then(console.log())
}

const changeHandler = () => {
    document.addEventListener("change", (e) => {
        if(e.target.matches(".radio-node")) {
            const givenAnswer = e.target.value
            console.log(e.target)
            const questionIndex = e.target.parentElement.dataset.question_id
            userAnswers[questionIndex] = e.target.value
            let isCorrect = true
            if(givenAnswer === decodeHTML(correctAnswers[parseInt(e.target.name)])){
                score += 1
                const divNodes = e.target.parentNode.children
                for (const node of divNodes){
                    if(node.type == "radio"){
                        node.disabled = true
                    }
                }
            }else if (givenAnswer !== correctAnswers[parseInt(e.target.name)]){
                const divNodes = e.target.parentNode.children
                isCorrect = false
                for (const node of divNodes){
                    if(node.type == "radio"){
                        node.disabled = true
                    }
                }
            }
            updateProgressBar(isCorrect)
            questionCounter++
            renderAnswersForm(questionsArray[questionCounter])
        }
    })
}

const updateProgressBar = (isCorrect) => {
    const progressDots = document.querySelectorAll("td")
    const progressDot = document.createElement("td")
    if(isCorrect){
        progressDot.innerHTML = `<span class="green-dot"></span>`
    }else if(isCorrect === false){
        progressDot.innerHTML = `<span class="red-dot"></span>`
    }
    if (progressDots.length <= 22) {
        document.querySelector("#progress-bar-row-1").append(progressDot)
    } else if (progressDots.length > 22 && progressDots.length <= 44) {
        document.querySelector("#progress-bar-row-2").append(progressDot)
    } else {
        document.querySelector("#progress-bar-row-3").append(progressDot)
    }

}

const clickHandler = () => {
    document.addEventListener("click", (e) => {
        if(e.target.matches("#start-timer")) {
            console.log(e.target)
            const startTimerButton = e.target
            startTimerButton.style.display = "none"
            document.querySelector("div#page-heading").style.display = "none"
            document.querySelector("div#question-container").style.display = "block"
            startTimer()
        }
    })
}

changeHandler()
clickHandler()

