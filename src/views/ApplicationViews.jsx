import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localUser = localStorage.getItem("user")
        const localUserObject = JSON.parse(localUser)

        setCurrentUser(localUserObject)
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
            </Route>
        </Routes>
    )
}
