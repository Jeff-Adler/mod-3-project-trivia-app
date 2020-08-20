QUIZ_URL = "http://localhost:3000/quizzes/"
CATEGORIES_PATH = "categories"
FIND_PATH = "find"


    document.addEventListener("DOMContentLoaded", () => {

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
            // submitButton = document.createElement("input")
            // submitButton.type = "submit"
            // submitButton.value = "Get quizzing!"

            // regularQuizButton = document.createElement("input")
            // regularQuizButton.id = "reg-quiz-but"
            // regularQuizButton.type = "submit"
            // regularQuizButton.value = "Regular quiz"

            // timedQuizButton = document.createElement("input")
            // timedQuizButton.id = "timed-quiz-but"
            // timedQuizButton.type = "submit"
            // timedQuizButton.value = "Take a timed quiz"


            // quizForm.append(regularQuizButton, timedQuizButton)
            // quizForm.append(submitButton)

        }


        const submitHandler = () => {
            document.addEventListener("submit", (e) => {
                const quizForm = document.querySelector("#quiz-selections")
                if(e.target.matches("#quiz-selections")){
                    const quizType = e.target.querySelector("#quiz-type-select").value
                    if(quizType === 'regular'){
                        quizForm.action = "views/quiz.html"
                    }else if(quizType === 'timed'){
                        quizForm.action = "views/timedquiz.html"
                    }
                }
            })
        }

        getCategoryList()
        submitHandler()
    })