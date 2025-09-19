// import { Link } from "react-router-dom"
import { UserInfo } from "./UserInfo"
import { UserSynths } from "./UserSynths"

export const NonCurrentUserProfile = () => {
    return (
        <>
        {UserInfo()}
        {UserSynths()}
        </>
    )
}