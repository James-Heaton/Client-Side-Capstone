import { Link } from "react-router-dom"

export const SynthDetail = () => {
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