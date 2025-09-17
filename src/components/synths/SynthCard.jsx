import { useState } from "react";
import { getSynths } from "../../services/synthService";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const SynthCard = () => {
  const [synths, setSynths] = useState([]);

  useEffect(() => {
    getSynths().then((synthData) => {
      setSynths(synthData);
    });
  }, []);

  return (
    <div>
      {synths.map((synth) => (
        <Link to={`/synth-detail/${synth.id}`} key={synth.id}>
          <div className="synth-card" key={synth.id}>
            <img className="synth-card-img" src={synth.imgUrl} alt={synth.name} />
            <div className="synth-card-name">
              <h3>{synth.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

// export const SynthCard = () => {
//     const synthArr = getSynths().then()

//     for (const synth of synthArr => {
//         return (
//             <Link to={`/synth-detail/${synth.id}`}>
//                 <div className="synth-card" key={synth.id}>
//                     <img className="synth-card-img" src={`${synth.imgUrl}`}/>
//                     <div className="synth-card-name">
//                         <h3>{synth.name}</h3>
//                     </div>
//                 </div>
//             </Link>
//         )
//     })
// }
