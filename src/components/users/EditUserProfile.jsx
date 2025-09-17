import { Link } from "react-router-dom"

export const EditUserProfile = () => {

  return (
    <div>
      <h1>Edit Profile</h1>
      <p>This is the edit profile placeholder </p>
      <Link to="/home">Save Changes</Link>
      {/* placeholder / will save data and use handleSaveProfile() and useNavigate() later */}
    </div>
  );
};
