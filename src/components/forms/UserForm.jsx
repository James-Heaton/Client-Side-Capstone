import "./EditUser.css";
import "../hooks/Toast.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getUserById,
  editUser,
  createNewUser,
} from "../../services/userService";
import { useToast, Toast } from "../hooks/Toast";

export const EditUserForm = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      getUserById(storedUser.id).then((userObj) => setUser(userObj));
    }
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const defaultImageUrl =
      "https://static.vecteezy.com/system/resources/previews/035/566/982/non_2x/avatar-icon-user-illustration-sign-account-symbol-personal-area-logo-vector.jpg";

    const editedUser = {
      id: user.id,
      name: user.name,
      bio: user.bio,
      email: user.email,
      password: user.password,
      imgUrl:
        user.imgUrl && user.imgUrl.trim() !== ""
          ? user.imgUrl
          : defaultImageUrl,
    };

    editUser(editedUser).then(() => {
      navigate(`/home`);
    });
  };

  return (
    <>
      <form className="edit-user-fields">
        <fieldset>
          <div>
            <div>
              <label>Name</label>
            </div>

            <input
              type="text"
              required
              value={user.name || ""}
              onChange={(event) => {
                const copy = { ...user };
                copy.name = event.target.value;
                setUser(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Email</label>
            </div>

            <div>
              <input
                type="email"
                required
                value={user.email || ""}
                onChange={(event) => {
                  const copy = { ...user };
                  copy.email = event.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Password</label>
            </div>

            <div>
              <input
                type="password"
                required
                value={user.password || ""}
                onChange={(event) => {
                  const copy = { ...user };
                  copy.password = event.target.value;
                  setUser(copy);
                }}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Profile Picture Url</label>
            </div>

            <input
              type="text"
              value={user.imgUrl || ""}
              onChange={(event) => {
                const copy = { ...user };
                copy.imgUrl = event.target.value;
                setUser(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Bio</label>
            </div>

            <textarea
              type="text"
              value={user.bio || ""}
              onChange={(event) => {
                const copy = { ...user };
                copy.bio = event.target.value;
                setUser(copy);
              }}
            />
          </div>
        </fieldset>
        <div className="sign-up-btns">
            <button 
            className="sign-up-back-btn"
            onClick={() => navigate("/home")}
            >
              Back
            </button>
            <button
          className="save-changes-btn"
          onClick={(event) => {
            event.preventDefault();
            if (user.name && user.email && isValidEmail(user.email)) {
              window.alert("Changes Saved");
              handleSave(event);
            } else {
              window.alert(`Name and valid email address required.`);
            }
          }}
        >
          Save Changes
        </button>
          </div>
        
      </form>
    </>
  );
};

export const CreateUserForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    bio: "",
    email: "",
    password: "",
    imgUrl: "",
  });

  const { toast, showToast, hideToast } = useToast();

  const handleCreateUser = (event) => {
    event.preventDefault();

    const defaultImageUrl =
      "https://static.vecteezy.com/system/resources/previews/035/566/982/non_2x/avatar-icon-user-illustration-sign-account-symbol-personal-area-logo-vector.jpg";

    const newUserToSubmit = {
      ...newUser,
      imgUrl:
        newUser.imgUrl && newUser.imgUrl.trim() !== ""
          ? newUser.imgUrl
          : defaultImageUrl,
    };

    createNewUser(newUserToSubmit).then((createdUser) => {
      localStorage.setItem("user", JSON.stringify({ id: createdUser.id }));
      setIsLoggedIn(true);
      navigate("/");
    });
  };

  return (
    <div className="edit-user">
      <h1 className="edit-header">Sign Up</h1>
      <div className="edit-user-form">
        <form className="edit-user-fields">
          <fieldset>
            <div>
              <div>
                <label>Name</label>
              </div>

              <input
                type="text"
                required
                value={newUser.name}
                placeholder="What should we call you?"
                onChange={(event) => {
                  const copy = { ...newUser };
                  copy.name = event.target.value;
                  setNewUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <div>
                <label>Email</label>
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  placeholder="youremail@email.com"
                  onChange={(event) => {
                    const copy = { ...newUser };
                    copy.email = event.target.value;
                    setNewUser(copy);
                  }}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
          <div>
            <div>
              <label>Password</label>
            </div>

            <div>
              <input
                type="password"
                required
                value={newUser.password}
                placeholder="password"
                onChange={(event) => {
                  const copy = { ...newUser };
                  copy.password = event.target.value;
                  setNewUser(copy);
                }}
              />
            </div>
          </div>
        </fieldset>
          <fieldset>
            <div>
              <div>
                <label>Profile Picture Url</label>
              </div>

              <input
                type="text"
                value={newUser.imgUrl}
                placeholder="https://example.com/profile-picture.jpg"
                onChange={(event) => {
                  const copy = { ...newUser };
                  copy.imgUrl = event.target.value;
                  setNewUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <div>
                <label>Bio</label>
              </div>

              <textarea
                type="text"
                value={newUser.bio}
                placeholder="Tell us about yourself!"
                onChange={(event) => {
                  const copy = { ...newUser };
                  copy.bio = event.target.value;
                  setNewUser(copy);
                }}
              />
            </div>
          </fieldset>
          <div className="sign-up-btns">
            <button 
            className="sign-up-back-btn"
            onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className="sign-up-btn"
              onClick={(event) => {
                event.preventDefault();
                if (
                  newUser.name &&
                  newUser.email &&
                  isValidEmail(newUser.email)
                ) {
                  // window.alert("Changes Saved");
                  handleCreateUser(event);
                } else {
                  //               window.alert(
                  //                 `Name and email required.
                  // Email must be a valid email address.`);
                  showToast(`Name and valid email address required.`, "error");
                }
              }}
            >
              Create Profile
            </button>
          </div>
        </form>
        <div>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={hideToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};
