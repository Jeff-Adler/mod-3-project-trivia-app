QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"

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
        const select = document.createElement("select")
        select.className = "quiz_selection"
        for (const category of categories) {
            const option = document.createElement("option")
            option.value = category["name"]
            option.innerText = category["name"]
            select.append(option)
        }
        document.querySelector("div.quiz_create").append(select)
    }

    getCategoryList()
})