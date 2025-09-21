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

  return (
    <div className="user-synths-block">
      <h1>{user.name}'s Synth Collection</h1>
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

  return (
    <div className="user-synths-block">
      <h1>My Synth Collection</h1>
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
};
