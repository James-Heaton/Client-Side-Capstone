import "./UserProfile.css";
import { getUserSynths } from "../../services/userService";
import { getUserById } from "../../services/userService";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const UserSynths = () => {
  const { userId } = useParams([]);
  const [user, setUser] = useState({});
  const [userSynths, setUserSynths] = useState([]);

  useEffect(() => {
    getUserById(userId).then((userObj) => {
      setUser(userObj);
    });
  }, [userId]);

  useEffect(() => {
    getUserSynths().then((userSynthsArr) => {
      setUserSynths(userSynthsArr);
    });
  }, []);

  const thisUsersSynths = userSynths.filter((userSynth) => userSynth.user?.id === user.id)

  if (thisUsersSynths.length > 0 ) {
    return (
    <div className="user-synths-block">
      <h1 className="collection-header">{user.name}'s Synth Collection</h1>
      <div className="user-synths">
        {userSynths &&
          Array.isArray(userSynths) &&
          userSynths
            .filter((userSynth) => userSynth.user?.id === user.id)
            .sort((a, b) => a.synth.name.localeCompare(b.synth.name))
            .map((userSynth) => (
              <Link
                to={`/synth-detail/${userSynth.synth.id}`}
                key={userSynth.synth.id}
                className="synth-card"
              >
                <div>
                  <img
                    className="synth-card-img"
                    src={userSynth.synth.imgUrl}
                    alt={userSynth.synth.name}
                  />
                </div>
                <div className="synth-card-name">
                  <h3>{userSynth.synth.name}</h3>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
  } else {
    return (
      <h1 className="no-synths-msg">{user.name} has not collected any synths yet!</h1>
    )
  }
  
};

export const UserHomeSynths = () => {
  const [user, setUser] = useState({});
  const [userSynths, setUserSynths] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      getUserById(storedUser.id).then((userObj) => setUser(userObj));
    }
  }, []);

  useEffect(() => {
    getUserSynths().then((userSynthsArr) => {
      setUserSynths(userSynthsArr);
    });
  }, []);

  const thisUsersSynths = userSynths.filter((userSynth) => userSynth.user?.id === user.id)

  if (thisUsersSynths.length > 0 ) {
    return (
    <div className="user-synths-block">
      <h1 className="collection-header">My Synth Collection</h1>
      <div className="user-synths">
        {userSynths &&
          Array.isArray(userSynths) &&
          userSynths
            .filter((userSynth) => userSynth.user?.id === user.id)
            .sort((a, b) => a.synth.name.localeCompare(b.synth.name))
            .map((userSynth) => (
              <Link
                to={`/synth-detail/${userSynth.synth.id}`}
                key={userSynth.synth.id}
                className="synth-card"
              >
                <div>
                  <img
                    className="synth-card-img"
                    src={userSynth.synth.imgUrl}
                    alt={userSynth.synth.name}
                  />
                </div>
                <div className="synth-card-name">
                  <h3>{userSynth.synth.name}</h3>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
  } else {
    return (
      <h1 className="no-synths-msg">Visit the <Link to="/catalogue"><span className="no-synths-msg-link">Synth Catalogue</span></Link> and start collecting!</h1>
    )
  }
  
};
