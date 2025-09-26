import "./UserProfile.css";
import { getUserById } from "../../services/userService";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast, Toast } from "../hooks/Toast";


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
      <div className="user-profile-name">
        <h1>{user.name}</h1>
      </div>
      <div className="user-info-block-bottom">
        <div className="bio-block">
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="user-back-btns">
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
  const location = useLocation();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (location.state?.successMessage) {
      showToast(location.state.successMessage, 'success');
      // Clear the state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Capture and preserve the fromLogin state across re-renders
  const [showBackButton] = useState(() => {
    const fromLogin = localStorage.getItem("fromLogin") === "true";
    if (fromLogin) {
      localStorage.removeItem("fromLogin");
    }
    return !fromLogin; // Return whether to show the back button
  });

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
      <div className="user-profile-name">
        <h1>{user.name}</h1>
      </div>
      <div className="user-info-block-bottom">
        <div className="bio-block">
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="user-edit-btns">
        {showBackButton && (
          <button onClick={handleBackClick} className="user-back-btn">
            Back
          </button>
        )}

        <button
          className="user-edit-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
    </div>
  );
};
