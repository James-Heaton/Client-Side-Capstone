import { Link } from "react-router-dom"

export const NonCurrentUserProfile = () => {
    return (
        <div>
            <h1>User Profile</h1>
            <p>This is the non-current user profile placeholder</p>
            <Link to="/synth-detail">Synth Card</Link>
        </div>
    )
}