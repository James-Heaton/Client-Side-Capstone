import { Link } from "react-router-dom"

export const Home = () => {

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page placeholder</p>
      <Link to="/edit-profile">Edit Profile</Link>
      <Link to="/synth-detail">Synth Card</Link>
    </div>
  );
};
