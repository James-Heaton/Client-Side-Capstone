import { Link } from "react-router-dom"

export const EditSynth = () => {
    return (
        <div>
            <h1>Edit Synth</h1>
            <p>This is the edit synth placeholder</p>
            <Link to="/synth-detail">Save Changes</Link>
            {/* Will have functionality using handleSaveSynth() and useNavigate() */}
        </div>
    )
}