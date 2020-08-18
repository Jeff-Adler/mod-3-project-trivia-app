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

document.addEventListener("DOMContentLoaded", () => {

    const loadQuizPage = (quizArray) => {
        renderQuiz(quizArray)
    }

    const findQuiz = (params) => {
        console.log(params)
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

        console.log(JSON.stringify(quizObj))

        fetch(QUIZ_URL + FIND_PATH, option)
            .then(response => response.json())
            .then(resp => loadQuizPage(resp))
    }

    findQuiz(params)
})