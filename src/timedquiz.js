QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"
FIND_PATH = "find"
SCORE_PATH = "/score"

// Task Block A:
// 1. Create a new html page for timed quiz ✓
// 2. Do a fetch request for 50 questions, and make a new array for correct answers with50 placeholders ✓
// 3. Figure out how to render 1 question at a time
// 4. Figure out how to track score (try to resuse old methods)
// 5. in Common.js, make sure it knows whether to do the method for quiz or timed quiz

// Set radio button attribute "name" dynamically in the JS


const params = getParams(window.location.href);
console.log(params)
retrieveQuiz(params)

const renderTimedQuizQuestions = (questions) => { //we still need to test if this gets hit when num_questions ===50
    console.log("hit render timed questions")
}