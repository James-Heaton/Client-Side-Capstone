import "./CreateSynth.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addNewSynth, getCharacteristics } from "../../services/synthService";

export const CreateSynthForm = () => {
  const navigate = useNavigate();
  const [characteristics, setCharacteristics] = useState([]);
  const [newSynth, setNewSynth] = useState({
    name: "",
    userId: "",
    characteristicId: "",
    description: "",
    yearMade: "",
    imgUrl: "",
    trackExample: "",
  });

  useEffect(() => {
    getCharacteristics().then((characteristicsArr) =>
      setCharacteristics(characteristicsArr)
    );
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const currentUser = JSON.parse(user);

    const currentYear = new Date().getFullYear();

    setNewSynth((prev) => ({
      ...prev,
      userId: currentUser.id,
      yearMade: currentYear,
    }));
  }, []);

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

  const handleCreateSynth = (event) => {
    event.preventDefault();

    const defaultImageUrl =
      "https://static.vecteezy.com/system/resources/thumbnails/060/455/076/small_2x/piano-icon-piano-keyboard-piano-keyboard-icon-piano-keyboard-icon-piano-keyboard-icon-vector.jpg";

    const synthToSubmit = {
      ...newSynth,
      characteristicId: parseInt(newSynth.characteristicId),
      yearMade: parseInt(newSynth.yearMade),
      userId: parseInt(newSynth.userId),
      imgUrl:
        newSynth.imgUrl && newSynth.imgUrl.trim() !== ""
          ? newSynth.imgUrl
          : defaultImageUrl,
    };

    addNewSynth(synthToSubmit).then(() => {
      navigate(`/catalogue`);
    });
  };

  return (
    <>
      <form className="create-synth-fields">
        <fieldset>
          <div>
            <div>
              <label>Name : </label>
            </div>

            <input
              type="text"
              required
              value={newSynth.name}
              placeholder="AwesomeSynth 5000"
              onChange={(event) => {
                const copy = { ...newSynth };
                copy.name = event.target.value;
                setNewSynth(copy);
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
              value={newSynth.characteristicId}
              onChange={(event) => {
                const copy = { ...newSynth };
                copy.characteristicId = event.target.value;
                setNewSynth(copy);
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
              value={newSynth.trackExample}
              placeholder='"Song" by Artist'
              onChange={(event) => {
                const copy = { ...newSynth };
                copy.trackExample = event.target.value;
                setNewSynth(copy);
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
              value={newSynth.imgUrl}
              placeholder="https://example.com/synth-image.jpg"
              onChange={(event) => {
                const copy = { ...newSynth };
                copy.imgUrl = event.target.value;
                setNewSynth(copy);
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
              value={newSynth.description}
              placeholder="Tell us a bit about your synth."
              onChange={(event) => {
                const copy = { ...newSynth };
                copy.description = event.target.value;
                setNewSynth(copy);
              }}
            />
          </div>
        </fieldset>
        <button
          className="synth-edit-btn"
          onClick={(event) => {
            event.preventDefault();
            if (
              newSynth.name &&
              newSynth.characteristicId &&
              newSynth.trackExample &&
              newSynth.description
            ) {
              window.alert("Synth Created!");
              handleCreateSynth(event);
            } else {
              window.alert(`All fields required!`);
            }
          }}
        >
          Create Synth
        </button>
      </form>
    </>
  );
};
