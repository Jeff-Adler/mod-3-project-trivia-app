QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"
FIND_PATH = "find"
let correctAnswers = []
let userAnswers = new Array(10);

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
    }
	return params;
};

const params = getParams(window.location.href);


document.addEventListener("DOMContentLoaded", () => {
    let score = 0
    const questionsContainer = document.querySelector("#questions-container")
    
    const renderNicknameForm = () => {
        const nameForm = document.createElement("form")
        nameForm.id = "nickname-form"
        nameForm.innerHTML =
        `<form>
        <label for="nickname">What's your nickname? We'll use it for the leaderboard.</label>
        <input type="text" id="nickname" name="nickname"<br>
      </form> 
        `
        questionsContainer.append(nameForm)
    }


    const renderQuizQuestions = (questionsArray) => {
        for(let i = 0; i < questionsArray.length; i++){ 
            const questionDiv = document.createElement("div")
            questionDiv.dataset.question_id = i
            questionDiv.id = "question-div"
            let answersArr = questionsArray[i]["incorrect_answers"]
            const correctAnswer = questionsArray[i]["correct_answer"]
            correctAnswers.push(correctAnswer)
            answersArr.push(correctAnswer)
            
            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            
            shuffleArray(answersArr)
            
            const question = document.createElement("h3")
            question.innerHTML = `${questionsArray[i]["question"]}`
            // in the CC add an indentation for the questiondiv
            questionDiv.innerHTML =
            `
            <input type="radio" class="radio-node" id="answer-one" name="${i}" value="${answersArr[0]}">
            <label class="question-choice" for="${answersArr[0]}">${answersArr[0]}</label><br>
            <input type="radio" class="radio-node" id="answer-two" name="${i}" value="${answersArr[1]}">
            <label class="question-choice" for="${answersArr[1]}">${answersArr[1]}</label><br>
            <input type="radio" class="radio-node" id="answer-three" name="${i}" value="${answersArr[2]}">
            <label class="question-choice" for="${answersArr[2]}">${answersArr[2]}</label><br>
            <input type="radio" class="radio-node" id="answer-four" name="${i}" value="${answersArr[3]}">
            <label class="question-choice" for="${answersArr[3]}">${answersArr[3]}</label>
            `
            questionsContainer.append(question)
            question.append(questionDiv)
            
            }
        console.log(correctAnswers)
    }

    const decodeHTML = (string) => {
        string = string.replace("&#039;","\'");
        string = string.replace("&amp;","&");
        string = string.replace("&lt;","<");
        string = string.replace("&gt;",">");
        string = string.replace("&quot;","\"");
        return string
    }

    const changeHandler = () => {
        document.addEventListener("change", (e) => {
            if(e.target.matches(".radio-node")){
                const questionIndex = e.target.parentElement.dataset.question_id
                userAnswers[questionIndex] = e.target.value
                if(e.target.value === decodeHTML(correctAnswers[parseInt(e.target.name)])){
                    score += 1
                    console.log("right!")
                    const questionDiv = e.target.parentNode
                    const divNodes = e.target.parentNode.children
                    for (const node of divNodes){
                        if(node.type == "radio"){
                            node.disabled = true
                        }
                    }
                    console.log(score)
                }else if (e.target.value !== correctAnswers[parseInt(e.target.name)]){
                    const questionDiv = e.target.parentNode
                    const divNodes = e.target.parentNode.children
                    for (const node of divNodes){
                        if(node.type == "radio"){
                            node.disabled = true
                        }
                    }
                    console.log("wrong!")
                }
            }   
        })
    }

    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            if(e.target.id === "submit-quiz-button"){
                const nicknameForm = document.querySelector("#nickname-form").remove()
                const scoreMessage = document.createElement("div")
                scoreMessage.innerHTML = `Congrats! You got a ${score}/10. <a href="../index.html">Take another quiz</a>`
                questionsContainer.prepend(scoreMessage)
                scroll(0,0)
                const body = e.target.parentNode
                console.log(userAnswers)
                console.log(correctAnswers)
                for(let i=0; i < correctAnswers.length; i++){
                    if(correctAnswers[i] === userAnswers[i]){
                        const divToColorChange = document.querySelector(`[data-question_id="${i}"]`)
                        divToColorChange.style.color = "green";
                    }
                    else if(correctAnswers[i] !== userAnswers[i]){
                        const divToColorChange = document.querySelector(`[data-question_id="${i}"]`)
                        divToColorChange.style.color = "red";
                    }
                }
                saveQuizForms(body)
            }
            
        })
    }

    const saveQuizForms = (body) => {
        // const nickName = body.querySelector("input#nickname").value
        // const userScore = score
    }


    const findQuiz = (params) => {
        const search = '\\+';
        const searchRegExp = new RegExp(search, 'g'); 
        const replaceWith = ' ';
        const result = params["category"].replace(searchRegExp, replaceWith);

        const quizObj = {
            category: result,
            difficulty: params["difficulty"]
        }
        const option = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(quizObj) 
        }
        fetch(QUIZ_URL + FIND_PATH, option)
            .then(response => response.json())
            .then(questions => renderQuizQuestions(questions))
    }

    findQuiz(params)
    changeHandler()
    clickHandler()
    renderNicknameForm()
})