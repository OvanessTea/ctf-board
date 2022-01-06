import {Link} from 'react-router-dom';

function Homepage() {
    return <>
        <h1>Hello world</h1>
        <Link to="/user/">Go to the private page</Link>
    </>
}

export {Homepage}