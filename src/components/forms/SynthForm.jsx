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

    const synthToSubmit = {
      ...newSynth,
      characteristicId: parseInt(newSynth.characteristicId),
      yearMade: parseInt(newSynth.yearMade),
      userId: parseInt(newSynth.userId),
    };

    addNewSynth(synthToSubmit).then(() => {
      navigate(`/catalogue`);
    });
  };

  return (
    <form className="create-a-synth-form">
      <fieldset>
        <div>
          <label>Name : </label>
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
          <label htmlFor="characteristic-select">
            Notable Characteristic :{" "}
          </label>
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
          <label>Featured In : </label>
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
          <label>Synth Image URL : </label>
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
          <label>Description : </label>
          <input
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
  );
};
