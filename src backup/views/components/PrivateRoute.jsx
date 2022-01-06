import React from 'react';
import { Outlet, useNavigate, Navigate} from 'react-router-dom';

const PrivateRoute = (props) => {
    const navigate = useNavigate();
    const {userState} = props;
    console.log(userState);

    return userState ? <Outlet />  : <Navigate to="/login" />;
}

export {PrivateRoute}