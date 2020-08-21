QUIZ_URL = "http://localhost:3000/quizzes/"
CATEGORIES_PATH = "categories"
FIND_PATH = "find"

TOGGLE_STATE = {
    "off" : "on",
    "on" : "off"
}

let current_toggle_state = "off"

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


        const getLeaderboardData = () => {
            fetch(QUIZ_URL)
            .then(response => response.json())
            .then(resp => createPlayerStats(resp))
        }

        const createPlayerStats = (leaderboardData) => {
            document.querySelectorAll(".table-element").forEach(e => e.remove())
            for(const leaderData of leaderboardData){
                const {nickname, score, difficulty, category, num_questions} = leaderData
                const leaderStats = {
                    nickname: nickname,
                    score: score,
                    difficulty: difficulty,
                    category: category,
                    num_questions: num_questions
                }
                renderPlayerStats(leaderStats, current_toggle_state)
            }

        }

        const renderPlayerStats = (stats, current_toggle_state) => {
            let questionCount
            current_toggle_state === "off" ? questionCount = 50 : questionCount = 10
            if(stats["score"] && stats["num_questions"] === questionCount) {

                console.log(stats)
                const leaderboardDiv = document.querySelector("#leaderboard-table")

                const tr = document.createElement("tr")
                tr.className = "table-element"

                const td1 = document.createElement("td")
                const td2 = document.createElement("td")
                const td3 = document.createElement("td")
                const td4 = document.createElement("td")

                td1.innerText = `${stats.nickname}`
                td2.innerText = `${stats.difficulty}`
                td3.innerText = `${stats.category}`
                td4.innerText = `${stats.score}`

                td1.className = "table-element"
                td2.className = "table-element"
                td3.className = "table-element"
                td4.className = "table-element"

                tr.append(td1)
                tr.append(td2)
                tr.append(td3)
                tr.append(td4)
                leaderboardDiv.append(tr)
            }
        }

        const changeHandler = () => { 
            document.addEventListener("change", (e) => {
                if (e.target.matches("#slider")) {
                    current_toggle_state = TOGGLE_STATE[current_toggle_state]
                    const leaderboardHeader = document.querySelector("h2#leaderboard")
                    current_toggle_state === "on" ? leaderboardHeader.innerText = "Leaderboard: Regular Quiz" : leaderboardHeader.innerText = "Leaderboard: Timed Quiz"
                    getLeaderboardData()
                }
            })

        }



        getCategoryList()
        submitHandler()
        getLeaderboardData()
        changeHandler()
    })