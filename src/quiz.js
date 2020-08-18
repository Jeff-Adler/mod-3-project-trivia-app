QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"
FIND_PATH = "find"

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

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }




document.addEventListener("DOMContentLoaded", () => {

    const questionsContainer = document.querySelector("#questions-container")
    const renderQuizQuestions = (questionsArray) => {
        for(let i = 0; i < questionsArray.length; i++){ 
            const questionDiv = document.createElement("div")
            questionDiv.id = "question-div"
            let answersArr = questionsArray[i]["incorrect_answers"]
            const correctAnswer = questionsArray[i]["correct_answer"]
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
            <input type="radio" id="answer-one" name="q${i}" value="${answersArr[0]}">
            <label for="${answersArr[0]}">${answersArr[0]}</label><br>
            <input type="radio" id="answer-two" name="q${i}" value="${answersArr[1]}">
            <label for="${answersArr[1]}">${answersArr[1]}</label><br>
            <input type="radio" id="answer-three" name="q${i}" value="${answersArr[2]}">
            <label for="${answersArr[2]}">${answersArr[2]}</label><br>
            <input type="radio" id="answer-four" name="q${i}" value="${answersArr[3]}">
            <label for="${answersArr[3]}">${answersArr[3]}</label>
            `
            questionsContainer.append(question)
            question.append(questionDiv)
            questionDiv.addEventListener("change", processChoice(correctAnswer))
            }
    }

    const processChoice = (e) => {
        console.log(e.target)
    }



    const findQuiz = (params) => {
        // console.log(params)
        const search = '\\+';
        const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
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

        // console.log(JSON.stringify(quizObj))

        fetch(QUIZ_URL + FIND_PATH, option)
            .then(response => response.json())
            .then(questions => renderQuizQuestions(questions))
    }

    findQuiz(params)
})