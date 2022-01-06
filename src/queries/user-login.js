import { API_URL_DEVELOP } from "../config";
import {checkUserLog} from "../application/check-user-log";


const formatGetResponse = (res) => {
    return JSON.stringify(res.keys, null, 2);
}

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
        // userNotLogged();
        localStorage.setItem("accessToken", "")
        return (null, null)
    }
    data = await res.json();
    
    // userIsLogged();
    return (data.access_token, data.token_type) 
    
}


export {loginUser}