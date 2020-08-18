QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"
FIND_PATH = "find"

document.addEventListener("DOMContentLoaded", () => {

    // Responsible for getting the list of categories from API and rendering them in the HTML
    const getCategoryList = () => {
        fetch(QUIZ_URL + NEW_PATH)
            .then(response => response.json())
            .then(categories => {
                renderCategories(categories["trivia_categories"])
            })
    }

    const renderCategories = (categories) => {
        const label = document.createElement("label")
        label.innerText = "Choose a quiz topic:"
        const select = document.createElement("select")
        select.className = "quiz_selection"
        for (const category of categories) {
            const option = document.createElement("option")
            option.value = category["name"]
            option.innerText = category["name"]
            select.append(option)
        }
        const quizForm = document.querySelector("#quiz-selections")
        quizForm.append(label, select)
        submitButton = document.createElement("input")
        submitButton.type = "submit"
        submitButton.value = "Submit"
        quizForm.append(submitButton)
        
        quizForm.addEventListener("submit", processForm)

    }

    const processForm = (e) => {
        e.preventDefault()
        const formElements = e.target.children
        const difficultyInput = formElements[1].value
        const quizTopicInput = formElements[3].value

        findQuiz(difficultyInput, quizTopicInput)
    }

    const findQuiz = (difficultyInput, topicInput) => {
        const quizObj = {
            difficulty: difficultyInput,
            topic: topicInput
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
        .then(resp => console.log(resp))
    }



    getCategoryList()
})