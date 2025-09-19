// import { Link } from "react-router-dom"
import { UserInfo } from "./UserInfo"

export const NonCurrentUserProfile = () => {
    return (
        <>
        {UserInfo()}
        </>

        // <div>
        //     <h1>User Profile</h1>
        //     <p>This is the non-current user profile placeholder</p>
        //     <Link to="/synth-detail">Synth Card</Link>
        //     <Link to="/collectors">Back</Link>
        // </div>
    )
}