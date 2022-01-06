import {useDispatch, useSelector} from "react-redux";
import {logUser, notLogUser} from './loginSlice';



function checkUserLog() {
    const dispatch = useDispatch();
    const userIsLogged = () => {
        console.log("user is logged")
        dispatch(logUser())
    };

    const userNotLogged = () => {
        console.log("user is not logged")
        dispatch(notLogUser())
    };
}
export {checkUserLog}