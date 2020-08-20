QUIZ_URL = "http://localhost:3000/quizzes/"
CATEGORIES_PATH = "categories"
FIND_PATH = "find"


// authorizationVerification(QUIZ_URL + NEW_PATH)
//     .then(response => response.json())
//     .then(authorizationResponse => directUser(authorizationResponse))



    document.addEventListener("DOMContentLoaded", () => {

        // Responsible for getting the list of categories from API and rendering them in the HTML
        const getCategoryList = () => {
            fetch(QUIZ_URL + CATEGORIES_PATH)
                .then(response => response.json())
                .then(categories => {
                    renderCategories(categories["trivia_categories"])
                })
        }

        const renderCategories = (categories) => {
            const label = document.createElement("label")
            label.innerText = "Topic: "
            const select = document.createElement("select")
            select.className = "quiz_selection"
            select.setAttribute("name","category")
            for (const category of categories) {
                const option = document.createElement("option")
                option.value = category["name"]
                option.innerText = category["name"]
                select.append(option)
            }
            const quizForm = document.querySelector("#quiz-selections")
            const lineBreak1 = document.createElement("br");
            const lineBreak2= document.createElement("br");
            quizForm.prepend(label, select,lineBreak1,lineBreak2)
            submitButton = document.createElement("input")
            submitButton.type = "submit"
            submitButton.value = "Let's get quizzing!"
            quizForm.append(submitButton)
            quizForm.addEventListener("submit", processForm)

        }

        const processForm = (e) => {
            const formElements = e.target.children
            const difficultyInput = formElements[1].value
            const quizTopicInput = formElements[3].value
            findQuiz(difficultyInput, quizTopicInput)
        }

        getCategoryList()
    })