import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";

import {logUser, notLogUser} from './application/loginSlice';

import {PrivateRoute} from './views/components/PrivateRoute';

import {Homepage} from "./views/routes/Homepage";
import {Registration} from './views/routes/Registration';
import {Login} from './views/routes/Login';
import {PageNotFound} from "./views/routes/PageNotFound";
import {PrivatePage} from "./views/routes/PrivatePage";


function App() {

  const userState = useSelector(state => state.userState.userState);
  console.log('User state is', userState)
  const dispatch = useDispatch();

  const userIsLogged = () => {
  dispatch(logUser())
  };

  const userNotLogged = () => {
  dispatch(notLogUser())
  };



  return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/user/' element={<PrivateRoute userState={userState}/>}>
                <Route exact path='/user/' element={<PrivatePage />}/>
            </Route>
            <Route exact path='/' element={<Homepage/>}/>
            <Route exact path='/register' element={<Registration userNotLogged={userIsLogged}/>}/>
            <Route exact path='/login' element={<Login userIsLogged={userIsLogged}/>}/>
            <Route exact path="/:pageName" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
