import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {loginUser} from "../../queries/user-login";
import {useDispatch} from "react-redux";
import {logUser, notLogUser} from '../../application/loginSlice';



function Login() {
    const [usernameLog, setUserNameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    // const [secretLog, setSecretLog] = useState('');
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userIsLogged = () => {
        console.log("user is logged")
        dispatch(logUser())
    };

    const userNotLogged = () => {
        console.log("user is not logged")
        dispatch(notLogUser())
    };

    const getData = () => {
      if (usernameLog.length < 5) {
        alert("Your username must be at least 5 symbols long");
      } else if (passwordLog.length < 5) {
        alert("Your password must be at least 5 symbols long");
      } else {
        loginUser(usernameLog, passwordLog)
          .then(result => {
            console.log("result", result); 
            if (result !== null) {
              localStorage.setItem("accessToken", result.access_token);
              userIsLogged();
              alert("You're logged in!");
              navigate('/');
            } else {
              userNotLogged();
              localStorage.setItem("accessToken", "");
              alert("Incurrect user info")
            }
          });
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