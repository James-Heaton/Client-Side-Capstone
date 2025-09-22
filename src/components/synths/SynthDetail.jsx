import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getSynthById } from "../../services/synthService";
import {
  addUserSynths,
  getUserSynths,
  deleteUserSynth,
} from "../../services/userService";
import "./SynthDetail.css";

export const SynthDetail = () => {
  const { synthId } = useParams();
  const [synth, setSynth] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userSynths, setUserSynths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSynthById(synthId).then((synthData) => {
      setSynth(synthData);
    });
  }, [synthId]);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localUserObject = JSON.parse(localUser);

    setCurrentUser(localUserObject);
  }, []);

  useEffect(() => {
    getUserSynths().then((userSynthArr) => {
      setUserSynths(userSynthArr);
    });
  }, []);

  const showEditBtn = () => {
    if (synth.user?.id === currentUser.id) {
      return (
        <Link to={`/edit-synth/${synth.id}`} className="synth-edit-btn">
          Edit
        </Link>
      );
    } else {
      return null;
    }
  };

  const userHasThisSynth = userSynths
    .filter((userSynth) => userSynth.userId === currentUser.id)
    .filter((userSynth) => userSynth.synthId === synth.id);

  const showCorrectButton = () => {
    if (userHasThisSynth.length > 0) {
      return (
        <div>
          <button onClick={handleRemoveSynth} className="add-btn">
            Remove From Collection
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={handleAddSynth} className="add-btn">
            Add To Collection
          </button>
        </div>
      );
    }
  };

  const handleRemoveSynth = () => {
    if (userHasThisSynth.length > 0) {
      const userSynthToDelete = userHasThisSynth[0];
      const userSynthId = userSynthToDelete.id;

      deleteUserSynth(userSynthId).then(() => {
        window.alert("Synth removed from collection.");
        setUserSynths(userSynths.filter(userSynth => userSynth.id !== userSynthId))
      });
    }
  };

  const handleAddSynth = () => {
    if (currentUser.id && synth.id) {
      const newUserSynth = {
        userId: currentUser.id,
        synthId: synth.id,
      };
      addUserSynths(newUserSynth).then((res) => {
        window.alert("Synth Added to Collection!");
        setUserSynths([...userSynths, res])
      });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="synth-details-whole">
      <h1 className="synth-header">{synth.name}</h1>

      <div className="synth-details">
        <div className="synth-details-left">
          <img
            src={synth.imgUrl}
            alt={synth.name}
            className="synth-details-img"
          />
          <div>{showCorrectButton()}</div>
        </div>
        <div className="synth-details-right">
          <div className="synth-info">
            <p>Created by : {synth.user?.name}</p>
            <p>Year : {synth.yearMade}</p>
            <p>
              Notable Characteristic : {synth.characteristic?.characteristic}
            </p>
            <p>Featured In : {synth.trackExample}</p>
            <h2 className="description">Description :</h2>
            <div className="synth-description">
              <p>{synth.description}</p>
            </div>
            <div className="synth-info-btns">
              <div>
                <button onClick={handleBackClick} className="synth-back-btn">
                  Back
                </button>
              </div>
              <div>{showEditBtn()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
