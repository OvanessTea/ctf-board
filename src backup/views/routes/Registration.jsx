import React, {useState} from "react";
import {API_URL_DEVELOP} from "../../config";


function Registration() {

    const [usernameReg, setUserNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [secretReg, setSecretReg] = useState('');

    const clearForm = () => {
        setUserNameReg('');
        setPasswordReg('');
        setSecretReg('');
    }
    
    async function postData() {      
        const postData = {
          username: usernameReg,
          password: passwordReg,
          secret: secretReg
        }
        console.log(postData)
        if (postData.username.length < 5) {
          alert('Your username must be at least 5 symbols long')
          clearForm();
        } else if (postData.password.length < 5) {
          alert('Your password must be at least 5 symbols long')
          clearForm();
        } else {
            try {
                const res = await fetch(`${API_URL_DEVELOP}auth/register`, {
                  mode: "cors",
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(postData),
                });
      
                if (!res.ok) {
                  const message = `An error has occured: ${res.status} - ${res.statusText}`;
                  clearForm();
                  if (res.status === 400) {
                    alert("This user already exists")
                  }
                  throw new Error(message);
                }
      
                clearForm();
            } catch(err) {
              console.log(err.message);
            };
        }
    }

    return (
        <div className='registration'>
            <h2>Registration</h2>
            <input 
                type="name" 
                placeholder="username" 
                id="username" 
                value={usernameReg} 
                onChange={(event) => setUserNameReg(event.target.value)}
            ></input>
            <input
                type="password" 
                placeholder="password" 
                id="password" 
                value={passwordReg}
                onChange={(event) => setPasswordReg(event.target.value)}
            ></input>
            <input 
                type="text" 
                placeholder="secret" 
                id="secret" 
                value={secretReg}
                onChange={(event) => setSecretReg(event.target.value)}  
            ></input>
            <button type="submit" onClick={postData}>Register</button>  
        </div>

    )

}

export {Registration}