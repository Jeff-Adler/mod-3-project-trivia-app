QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"
FIND_PATH = "find"
SCORE_PATH = "/score"


const retrieveQuiz = (params) => {
    const search = '\\+';
    const searchRegExp = new RegExp(search, 'g'); 
    const replaceWith = ' ';
    const result = params["category"].replace(searchRegExp, replaceWith);
    const quizType = params["quiz-type"]
    let numQuestions;
    if(quizType === "timed"){
        numQuestions = 50 
    }else if(quizType === "regular"){
        numQuestions = 10
    }
    const quizObj = {
        category: result,
        difficulty: params["difficulty"],
        num_questions: numQuestions
    }
    const option = {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "accept": "application/json"
    },
    body: JSON.stringify(quizObj) 
    }
    fetch(QUIZ_URL + NEW_PATH, option)
        .then(response => response.json())
        .then(questionsHash => {
            if(quizType === "timed"){
                renderTimedQuizQuestions(questionsHash) //timedquiz.js function
            } else if(quizType === "regular"){
                renderQuizQuestions(questionsHash) //quiz.js function
            }
        })
}

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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const decodeHTML = (string) => {
    string = string.replace("&#039;","\'");
    string = string.replace("&amp;","&");
    string = string.replace("&lt;","<");
    string = string.replace("&gt;",">");
    string = string.replace("&quot;","\"");
    return string
}