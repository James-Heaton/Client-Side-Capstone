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

  return (
    <form className="edit-synth-form">
      <fieldset>
        <div>
          <label>Name : </label>
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
          <label htmlFor="characteristic-select">
            Notable Characteristic :
          </label>
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
          <label>Featured In : </label>
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
          <label>Synth Image URL : </label>
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
          <label>Description : </label>
          <input
            type="text"
            required
            value={synth.description || ""}
            placeholder={synth.description}
            onChange={(event) => {
              const copy = { ...synth };
              copy.description = event.target.value;
              setSynth(copy);
            }}
          />
        </div>
      </fieldset>
      <button
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
    </form>
  );
};
