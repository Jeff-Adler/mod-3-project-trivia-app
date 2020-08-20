QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"
FIND_PATH = "find"
SCORE_PATH = "/score"

let correctAnswers = []
let userAnswers = new Array(50);
let score = 0
let questionCounter = 0
let questionsArray = []

// Task Block A:
// 1. Create a new html page for timed quiz ✓
// 2. Do a fetch request for 50 questions, and make a new array for correct answers with50 placeholders ✓
// 3. Figure out how to render 1 question at a time
// 4. Figure out how to track score (try to resuse old methods)
// 5. in Common.js, make sure it knows whether to do the method for quiz or timed quiz

// Set radio button attribute "name" dynamically in the JS


const params = getParams(window.location.href);

retrieveQuiz(params)

const answersForm = document.querySelector("#answers-form")

//1. Loop through array of Questions
//2. Takes a question JSON element: keeps track of correctAnswer, shuffles array of answers
//3. renders questions+answers on the HTML

const renderAnswersForm = (answersJson) => {
    //sets the id of current question
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
    console.log(questionsArray)

    renderAnswersForm(questionsArray[questionCounter])

    console.log(correctAnswers)
}

const startTimer = () => {
    var totalSeconds = 10;

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
}

const reportResults = () => {
    const h1 = document.createElement("h1")
    h1.innerText = score.toString()
    document.querySelector("body").append(h1)
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
            if(givenAnswer === decodeHTML(correctAnswers[parseInt(e.target.name)])){
                score += 1
                const questionDiv = e.target.parentNode
                const divNodes = e.target.parentNode.children
                for (const node of divNodes){
                    if(node.type == "radio"){
                        node.disabled = true
                    }
                }
            }else if (givenAnswer !== correctAnswers[parseInt(e.target.name)]){
                const questionDiv = e.target.parentNode
                const divNodes = e.target.parentNode.children
                for (const node of divNodes){
                    if(node.type == "radio"){
                        node.disabled = true
                    }
                }
            }
            console.log(score)
            questionCounter++
            renderAnswersForm(questionsArray[questionCounter])
        }
    })
}

const clickHandler = () => {
    document.addEventListener("click", (e) => {
        if(e.target.matches("#start-timer")) {
            console.log(e.target)
            const startTimerButton = e.target
            startTimerButton.style.display = "none"
            document.querySelector("#answers-form").style.display = "block"
            startTimer()
        }
    })
}

changeHandler()
clickHandler()

