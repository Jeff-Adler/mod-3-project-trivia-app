// Task Block A:
// 1. Create a new html page for timed quiz
// 2. Do a fetch request for 50 questions, and make a new array for correct answers with50 placeholders
// 3. Figure out how to render 1 question at a time
// 4. Figure out how to track score (try to resuse old methods)

// Set radio button attribute "name" dynamically in the JS


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


retrieveTimedQuiz(params, 50)