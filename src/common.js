const retrieveQuiz = (params, numQuestions) => {
    const search = '\\+';
    const searchRegExp = new RegExp(search, 'g'); 
    const replaceWith = ' ';
    const result = params["category"].replace(searchRegExp, replaceWith);

    const quizObj = {
        category: result,
        difficulty: params["difficulty"],
        numberQuestions: numQuestions
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
        .then(questionsHash => renderQuizQuestions(questionsHash))
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

