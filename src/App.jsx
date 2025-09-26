import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./auth/Login";
import { CreateUserForm } from "./components/forms/UserForm";
import { useState, useEffect } from "react";
import { NavBar } from "./components/nav/NavBar";
import { ApplicationViews } from "./views/ApplicationViews";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    setIsLoggedIn(true);
  }
}, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <NavBar setIsLoggedIn={setIsLoggedIn} />
          <ApplicationViews />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<CreateUserForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      )}
    </div>
  );
};
