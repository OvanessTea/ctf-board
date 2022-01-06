import { API_URL_DEVELOP } from "../config";


async function loginUser(username, password) {
    let data = {
        username: username,
        password: password,
        // secret: secretLog
    }
    const res = await fetch(`${API_URL_DEVELOP}auth/login`, {
        mode: "cors",
        method: "post",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    
    if (!res.ok | res.status !== 200) {
        return null
    }
    const responseLog = await res.json();
    console.log('resLog', responseLog);

    return responseLog 
    
}


export {loginUser}