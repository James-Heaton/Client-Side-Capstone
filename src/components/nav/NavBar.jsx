import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { getUserById } from "../../services/userService";
import "./NavBar.css"

export const NavBar = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser?.id) {
    getUserById(storedUser.id).then((userObj) => (
      setUser(userObj)
    ))
  }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }
  return (
    <ul className="navbar">
      <li className="nav-item"><Link to="/">SynthFolio</Link></li>
      <li className="nav-item"><Link to="/home">My Synths</Link></li>
      <li className="nav-item"><Link to="/collectors">Collectors</Link></li>
      <li className="nav-item"><Link to="/catalogue">Synth Catalogue</Link></li>
      <li className="nav-item"><Link to="/create">Create A Synth</Link></li>
      <li className="logout-nav">
        <span>
          <Link to="/home">
          <img className="nav-user-img"src={user.imgUrl} alt={user.name}/>
          </Link>
          
        </span>
        <span className="current-user-nav">{user.name}
          <div>
            <button className="nav-logout"onClick={handleLogout}>Sign Out</button>
          </div>
          
        </span>
        
      </li>
    </ul>
  );
};