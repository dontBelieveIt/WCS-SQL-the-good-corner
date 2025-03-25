import { Link } from "react-router";

const NoPageFound = () => {
    return(
        <main className="main-content">
            <h2>No content found</h2>
            <p><Link to="/" className="link-button">Return to the main page</Link></p>
        </main>
    )
}

export default NoPageFound; 