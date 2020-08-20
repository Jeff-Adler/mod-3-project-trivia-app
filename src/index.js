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
            for(const leaderData of leaderboardData){
                const {nickname, score, difficulty, category} = leaderData
                const leaderStats = {
                    nickname: nickname,
                    score: score,
                    difficulty: difficulty,
                    category: category
                }
                renderPlayerStats(leaderStats)
            }

        }

        const renderPlayerStats = (stats) => {
            const leaderboardDiv = document.querySelector("#leaderboard")
            const playerLi = document.createElement("li")
            const nickname = stats["nickname"].replace("+", " ")
            playerLi.innerHTML = `Nickname: ${nickname} | Difficulty: ${stats["difficulty"]} | Category: ${stats["category"]} | Score: ${stats["score"]} `
            leaderboardDiv.append(playerLi)
            console.log(stats)

        }

        //stretch goal: rank players
        // function compare(a,b) {
        //     if (a.score < b.score)
        //       return -1;
        //     if (a.score > b.score)
        //       return 1;
        //     return 0;
        //   }
          
        //   playerArray.sort(compare);

        getCategoryList()
        submitHandler()
        getLeaderboardData()
    })