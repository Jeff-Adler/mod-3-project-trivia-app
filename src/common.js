
const authorizationVerification = (url) => {
    return fetch(url)
}

const directUser = (authorizationResponse) => {
    if (authorizationResponse.authorized === "no") {
        window.location.replace("./views/welcome.html");
    }
}
