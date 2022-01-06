import React from "react";
import { useParams, Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div>
            <p>Page was not found</p>
            <Link to="/" >Return to Home page</Link>
        </div>
    )
}

export {PageNotFound}