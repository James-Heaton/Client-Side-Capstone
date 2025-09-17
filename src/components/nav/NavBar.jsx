import { Link } from "react-router-dom"

export const NavBar = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }
  return (
    <ul className="navbar">
      <li className="site-name-nav"><Link to="/">SynthFolio</Link></li>
      <li className="my-synths-nav"><Link to="/home">My Synths</Link></li>
      <li className="collectors-nav"><Link to="/collectors">Collectors</Link></li>
      <li className="synth-catalogue-nav"><Link to="/catalogue">Synth Catalogue</Link></li>
      <li className="create-synth-nav"><Link to="/create">Create A Synth</Link></li>
      <li className="logout-nav">
        <span>*User Icon*</span>
        <span className="current-user-nav">Current User Name</span>
        <button onClick={handleLogout}>Sign Out</button>
        {/* <Link to="/login">Sign Out</Link> */}
        {/* placeholder / will have functionality using handleLogOut() and useNavigate() */}
      </li>
    </ul>
  );
};