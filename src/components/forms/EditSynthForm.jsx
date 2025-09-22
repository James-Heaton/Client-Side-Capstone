import "./EditSynth.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getSynthById,
  editSynth,
  getCharacteristics,
} from "../../services/synthService";

export const EditSynthForm = () => {
  const navigate = useNavigate();
  const { synthId } = useParams();
  const [characteristics, setCharacteristics] = useState([]);
  const [synth, setSynth] = useState({});

  useEffect(() => {
    getCharacteristics().then((characteristicsArr) =>
      setCharacteristics(characteristicsArr)
    );
  }, []);

  useEffect(() => {
    getSynthById(synthId).then((synthData) => {
      setSynth(synthData);
    });
  }, [synthId]);

  const characteristicOptions = () => {
    return characteristics
      .sort((a, b) => a.characteristic.localeCompare(b.characteristic))
      .map((characteristic) => {
        return (
          <option key={characteristic.id} value={characteristic.id}>
            {characteristic.characteristic}
          </option>
        );
      });
  };

  const handleEditSynth = (event) => {
    event.preventDefault();

    const defaultImageUrl =
      "https://static.vecteezy.com/system/resources/thumbnails/060/455/076/small_2x/piano-icon-piano-keyboard-piano-keyboard-icon-piano-keyboard-icon-piano-keyboard-icon-vector.jpg";

    const editedSynth = {
      id: synth.id,
      name: synth.name,
      userId: parseInt(synth.userId),
      characteristicId: parseInt(synth.characteristicId),
      description: synth.description,
      yearMade: parseInt(synth.yearMade),
      imgUrl:
        synth.imgUrl && synth.imgUrl.trim() !== ""
          ? synth.imgUrl
          : defaultImageUrl,
      trackExample: synth.trackExample,
    };

    editSynth(editedSynth).then(() => {
      navigate(`/synth-detail/${synth.id}`);
    });
  };

  // const handleBackClick = () => {
  //   navigate(`/synth-detail/${synth.id}`);
  // };

  return (
    <>
      <form className="edit-synth-fields">
        <fieldset>
          <div>
            <div>
              <label>Name : </label>
            </div>
            <input
              type="text"
              required
              value={synth.name || ""}
              placeholder={synth.name}
              onChange={(event) => {
                const copy = { ...synth };
                copy.name = event.target.value;
                setSynth(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label htmlFor="characteristic-select">
                Notable Characteristic :
              </label>
            </div>

            <select
              id="characteristic-select"
              required
              name="characteristic"
              value={synth.characteristicId || ""}
              onChange={(event) => {
                const copy = { ...synth };
                copy.characteristicId = event.target.value;
                setSynth(copy);
              }}
            >
              <option value="">What does it sound like?</option>
              {characteristicOptions()}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Featured In : </label>
            </div>

            <input
              type="text"
              required
              value={synth.trackExample || ""}
              placeholder={synth.trackExample}
              onChange={(event) => {
                const copy = { ...synth };
                copy.trackExample = event.target.value;
                setSynth(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Synth Image URL : </label>
            </div>

            <input
              type="text"
              value={synth.imgUrl || ""}
              placeholder={synth.imgUrl}
              onChange={(event) => {
                const copy = { ...synth };
                copy.imgUrl = event.target.value;
                setSynth(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Description : </label>
            </div>

            <textarea
              type="text"
              required
              value={synth.description || ""}
              placeholder={synth.description}
              className="edit-synth-description"
              onChange={(event) => {
                const copy = { ...synth };
                copy.description = event.target.value;
                setSynth(copy);
              }}
            />
          </div>
        </fieldset>
        <div className="synth-info-btns">
          {/* <button onClick={handleBackClick} className="synth-back-btn">
            Back
          </button> */}
          <button
            className="synth-edit-btn"
            onClick={(event) => {
              event.preventDefault();
              if (
                synth.name &&
                synth.characteristicId &&
                synth.trackExample &&
                synth.description
              ) {
                window.alert("Changed Saved!");
                handleEditSynth(event);
              } else {
                window.alert(`All fields required!`);
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
