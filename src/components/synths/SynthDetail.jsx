import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSynthById } from "../../services/synthService";
import "./SynthDetail.css";

export const SynthDetail = () => {
  const { synthId } = useParams();
  const [synth, setSynth] = useState({});
  const [currentUser, setCurrentUser] = useState({});

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

  const showEditBtn = () => {
    if (synth.user?.id === currentUser.id) {
      return <Link to="/edit-synth" className="synth-edit-btn">Edit</Link>;
    } else {
      return null;
    }
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
          <div>
            <button className="add-btn">Add To Collection</button>
            {/* placeholder */}
          </div>
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
                <Link to="/catalogue" className="synth-back-btn">Back</Link>
              </div>
              <div>{showEditBtn()}</div>
            </div>
          </div>

          {/* Edit only visible to synth's creator */}
        </div>
      </div>
    </div>
  );
};
