import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {loginUser} from "../../queries/user-login";



function Login() {
    const [usernameLog, setUserNameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    // const [secretLog, setSecretLog] = useState('');
    const [postResult, setPostResult] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    
    const navigate = useNavigate();

    const getData = () => {
      if (usernameLog.length < 5) {
        alert("Your username must be at least 5 symbols long");
      } else if (passwordLog.length < 5) {
        alert("Your password must be at least 5 symbols long");
      } else {
        const result = loginUser(usernameLog, passwordLog);
        setAccessToken(result[1]);
        if (result[1] !== null) {
          localStorage.setItem("accessToken", accessToken);
          alert("You're logged in!");
          navigate('/');
        } else {
          alert("Incurrect user info")
        }
      }
      
    }
    

    

    return (
      <div className='login'>
          <h2>Login</h2>
          <input 
              type="name" 
              placeholder="username" 
              id="username" 
              value={usernameLog} 
              onChange={(event) => setUserNameLog(event.target.value)}
          ></input>
          <input
              type="password" 
              placeholder="password" 
              id="password" 
              value={passwordLog}
              onChange={(event) => setPasswordLog(event.target.value)}
          ></input>
          <label className="logBtns">
              <button onClick={getData} className="links">Login</button>
              <button className="links" onClick={() => navigate('/register')}>Register</button>
          </label>
      </div>

    )
}

export {Login}