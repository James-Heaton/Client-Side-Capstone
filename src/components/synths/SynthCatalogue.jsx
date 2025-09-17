import { Link } from "react-router-dom"

export const SynthCatalogue = () => {
    return (
        <div>
            <h1>Synth Catalogue</h1>
            <p>This is the synth catalogue placeholder</p>
            <Link to="/synth-detail">Synth Card</Link>
        </div>
    )
}