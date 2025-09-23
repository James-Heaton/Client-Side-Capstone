import { Login } from "./auth/Login";
import { useState } from "react";
import { useEffect } from "react";
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
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};
