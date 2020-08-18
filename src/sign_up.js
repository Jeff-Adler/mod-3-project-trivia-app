USER_URL = "http://localhost:3000/users/"
CREATE_PATH = "create"

document.addEventListener("DOMContentLoaded", () => {

    const openIndex = () => {
       window.location.replace("../index.html");
    }

    const submitHandler = () => {
        document.addEventListener("submit",(e) => {
            e.preventDefault()
            const submit = e.target
            if (submit.matches("form#sign-up")) {

                const user = {
                    first_name: submit.querySelector("#first_name").value,
                    last_name: submit.querySelector("#last_name").value,
                    username: submit.querySelector("#username").value,
                    email: submit.querySelector("#email").value
                }
                
                const configObj = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(user) 
                }

                fetch(USER_URL + CREATE_PATH,configObj)
                    .then(openIndex())
            }
        })
    }

    submitHandler()
})