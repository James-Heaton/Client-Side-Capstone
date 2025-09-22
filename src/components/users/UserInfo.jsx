import "./UserProfile.css";
import { getUserById } from "../../services/userService";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export const UserInfo = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId).then((userData) => {
      setUser(userData);
    });
  }, [userId]);

  return (
    <div className="user-info-block">
      <div className="user-info-block-top">
        <img src={user.imgUrl} alt={user.name} className="user-info-img" />
      </div>
      <div>
        <h1>{user.name}</h1>
      </div>
      <div className="user-info-block-bottom">
        <h2>Bio :</h2>
        <div className="bio-block">
          <p>{user.bio}</p>
        </div>
      </div>
      <div>
        {/* <Link to="/collectors">Back</Link> */}
        <button
          className="user-back-btn"
          onClick={() => navigate("/collectors")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export const UserHomeInfo = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      getUserById(storedUser.id).then((userObj) => setUser(userObj));
    }
  }, []);

  return (
    <div className="user-info-block">
      <div className="user-info-block-top">
        <img src={user.imgUrl} alt={user.name} className="user-info-img" />
      </div>
      <div>
        <h1>{user.name}</h1>
      </div>
      <div className="user-info-block-bottom">
        <h2>Bio :</h2>
        <div className="bio-block">
          <p>{user.bio}</p>
        </div>
      </div>
      {/* <Link to="/edit-profile" className="synth-profile-btn">
        Edit Profile
      </Link> */}
      <div className="user-edit-btns">
          <button onClick={handleBackClick} className="synth-back-btn">
            Back
          </button>
          <button
            className="user-edit-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
      </div>
    </div>
  );
};
