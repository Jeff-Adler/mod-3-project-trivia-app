QUIZ_URL = "http://localhost:3000/quizzes/"
NEW_PATH = "new"

document.addEventListener("DOMContentLoaded", () => {

    // Responsible for getting the list of categories from API and rendering them in the HTML
    const getCategoryList = () => {
        fetch(QUIZ_URL + NEW_PATH)
            .then(response => console.log(response))
            .then(categories => {
                console.log(categories)
                renderCategories(categories)
            })
    }

    const getTest = () => {
        fetch(QUIZ_URL + NEW_PATH)
            .then(response => response.text())
            .then(test => {
                testMethod(test)
            })
    }

    const testMethod = (test) => {
        console.log("console")
        console.log(test)
    }

    const renderCategories = (categories) => {
        const select = document.createElement("select")
        select.className = "quiz_selection"
        for (const category in categories) {
            const option = document.createElement("option")
            option.value = category["name"]
            option.innerText = category["name"]
            select.append(option)
        }
        document.querySelector("div.quiz_create").append(select)
    }

    // getCategoryList()
    getTest()
})