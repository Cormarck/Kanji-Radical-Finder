import {Link} from "react-router-dom";

let PageNotFound = function () {
    return (
        <>
        <div>404 Page not Found!</div>
        <p><Link to="/">Homepage</Link></p>
        </>
    )
}

export default PageNotFound