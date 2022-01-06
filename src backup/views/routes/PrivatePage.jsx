import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_URL_DEVELOP} from '../../config';


function PrivatePage() {
    const [userInfo, setUserInfo] = useState({})
    const params = useParams();

    const formatGetResponse = (res) => {
        return JSON.stringify(res.keys, null, 2);
    }

    useEffect(() => {
        async function getUserInfo() {
            const getData = localStorage.getItem('accessToken');
            console.log(getData)
            const res = await fetch(`${API_URL_DEVELOP}user/`, {
                mode: "cors",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getData
                },
            
            });
            console.log(res)
            console.log(res.ok)
            console.log(res.status)
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
            }
            const data = await res.json();
            
            const result = {
            status: res.status + "-" + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
            },
            data: data,
            };
            console.log(data)
            setUserInfo(result.data);
        }
        getUserInfo();

        return () => {};
      }, [])   

    return <>
        <h1>User's unfo: </h1>
        <p>ID {userInfo.id}</p> 
        <p>username {userInfo.username}</p> 
        <p>password {userInfo.password}</p> 
        <p>secret {userInfo.secret}</p>  
    </>
}
export {PrivatePage}