USER_URL = "http://localhost:3000/users/"
CREATE_PATH = "create"

document.addEventListener("DOMContentLoaded", () => {

    const openIndex = () => {
        window.open("../index.html");
    }

    const submitHandler = () => {
        document.addEventListener("submit",(e) => {
            e.preventDefault()
            const submit = e.target
            if (submit.matches("form#sign-up")) {

                const userObj = {
                    firstName: submit.querySelector("#first_name").value,
                    lastName: submit.querySelector("#last_name").value,
                    userName: submit.querySelector("#username").value,
                    email: submit.querySelector("#email").value
                }
                
                const configObj = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(userObj) 
                }

                fetch(USER_URL + CREATE_PATH,configObj)
                    .then(response => response.json())
                    .then(openIndex())
            }
        })
    }

    submitHandler()
})