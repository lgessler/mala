
function getCookie(key) {
    const pieces = document.cookie.split(";");
    for (let piece of pieces) {
        const [k, v] = piece.split("=");
        if (k.trim() === key.trim()) {
            return v;
        }
    }
    return "";
}

function getToken() {
    return getCookie("token").replace("__SEMI__", ";").replace("__EQ__", "=");
}

export const api = new Api(getToken());

// Ensure user has good credentials, otherwise redirect to login page
async function checkAuth () {
    const token = getToken();
    const onLogin = window.location.href.endsWith("/login.html");
    try {
        const response = await api.checkToken(token);
        console.log("Token is " + (response.ok ? "valid" : "invalid"));
        if (!response.ok && !onLogin) {
            window.location.href = "/login.html";
        } else {
            api.token = token;
        }
    } catch (e) {
        console.log("Failed to contact API");
        console.log(e);
        if (!onLogin) {
            window.location.href = "/login.html";
        }
    }
}
checkAuth();
