import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserById } from "../../services/userService";
import { editUser } from "../../services/userService";

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

    const defaultImageUrl = "https://static.vecteezy.com/system/resources/previews/035/566/982/non_2x/avatar-icon-user-illustration-sign-account-symbol-personal-area-logo-vector.jpg"

    const editedUser = {
      id: user.id,
      name: user.name,
      bio: user.bio,
      email: user.email,
      imgUrl: user.imgUrl && user.imgUrl.trim() !== "" ? user.imgUrl : defaultImageUrl,
    };

    editUser(editedUser).then(() => {
      navigate(`/home`);
    });
  };

  return (
    <div className="edit-user">
      {/* <div>
        <img src={user.imgUrl} />
        <h1>{user.name}</h1>
      </div> */}
      <form className="edit-user-form">
        <fieldset>
          <div>
            <label>Name : </label>
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
            <label>Email : </label>
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
            <label>Profile Picture Url : </label>
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
            <label>Bio : </label>
            <input
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
        <button
          className="save-changes-btn"
          onClick={(event) => {
            event.preventDefault();
            if (user.name && user.email && isValidEmail(user.email)) {
              window.alert("Changes Saved");
              handleSave(event);
            } else {
              window.alert(
                `Name and email required.
Email must be a valid email address.`
              );
            }
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
