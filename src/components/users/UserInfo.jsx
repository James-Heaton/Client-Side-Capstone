import { getUserById } from "../../services/userService";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const UserInfo = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

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
    </div>
  );
};

export const UserHomeInfo = () => {
  const [user, setUser] = useState({});

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
      <Link to="/edit-profile" className="synth-profile-btn">
        Edit
      </Link>
    </div>
  );
};
