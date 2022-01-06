import React, {useState} from "react";
import {API_URL_DEVELOP} from "../../config";
import {useNavigate} from 'react-router-dom';


function Login(props) {
    const {userIsLogged = Function.prototype, userNotLogged = Function.prototype} = props

    const [usernameLog, setUserNameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    // const [secretLog, setSecretLog] = useState('');
    const [postResult, setPostResult] = useState('');
    
    const navigate = useNavigate();

    const formatGetResponse = (res) => {
      return JSON.stringify(res.keys, null, 2);
  }
  
  async function getData() {
  
      const getData = {
          username: usernameLog,
          password: passwordLog,
          // secret: secretLog
      }
      if (getData.username.length < 5) {
          alert('Your username must be at least 5 symbols long')
      } else if (getData.password.length < 5) {
          alert('Your password must be at least 5 symbols long')
      } else {
          const res = await fetch(`${API_URL_DEVELOP}auth/login`, {
              mode: "cors",
              method: "post",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(getData),
          });
          
          if (!res.ok) {
              const message = `An error has occured: ${res.status} - ${res.statusText}`;
              // clearForm();
              if (res.status === 401) {
              alert("Incorrect username or password");
              userNotLogged();
              localStorage.setItem("accessToken", "")
              }
              throw new Error(message);
              return (null, null)
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
          localStorage.setItem("accessToken", result.data.access_token);
            userIsLogged();
            alert("You're logged in!");
            navigate('/');
          
      }
  }
      
      // async function getData() {
      //   const getData = {
      //     username: usernameLog,
      //     password: passwordLog,
      //     // secret: secretLog
      //   }
      //   if (getData.username.length < 5) {
      //     alert('Your username must be at least 5 symbols long')
      //   } else if (getData.password.length < 5) {
      //     alert('Your password must be at least 5 symbols long')
      //   } else {
      //       const res = await fetch(`${API_URL_DEVELOP}auth/login`, {
      //         mode: "cors",
      //         method: "post",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify(getData),
      //       });
            
      //       if (!res.ok) {
      //         const message = `An error has occured: ${res.status} - ${res.statusText}`;
      //         // clearForm();
      //         if (res.status === 401) {
      //           alert("Incorrect username or password");
      //           userNotLogged();
      //           localStorage.setItem("accessToken", "")
      //         }
      //         throw new Error(message);
      //       }
      //       const data = await res.json();
            
      //       const result = {
      //         status: res.status + "-" + res.statusText,
      //         headers: {
      //           "Content-Type": res.headers.get("Content-Type"),
      //           "Content-Length": res.headers.get("Content-Length"),
      //         },
      //         data: data,
      //       };
        
      //       setPostResult(formatGetResponse(result));
      //       localStorage.setItem("accessToken", result.data.access_token);
      //       userIsLogged();
      //       alert("You're logged in!");
      //       navigate('/');
            
      //     }
      // }

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