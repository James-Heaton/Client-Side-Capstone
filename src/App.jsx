import { Routes, Route } from "react-router-dom";
import { Login } from "./auth/Login";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  )
}
