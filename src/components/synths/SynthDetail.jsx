import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getSynthById } from "../../services/synthService";

export const SynthDetail = () => {
    const { synthId } = useParams();
    const [synth, setSynth] = useState({});
    
    useEffect(() => {
        getSynthById(synthId).then(synthData => {
            setSynth(synthData)
        })
    }, [synthId])

    return (
        <div>
            <h1>Synth Detail</h1>
            <p>This is the synth detail placeholder</p>
            <Link to="/catalogue">Back</Link>
            <Link to="/edit-synth">Edit</Link>
            {/* Edit only visible to synth's creator */}
        </div>
    )
}