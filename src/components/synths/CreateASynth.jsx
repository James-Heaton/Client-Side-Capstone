import { Link } from "react-router-dom"

export const CreateASynth = () => {
    return (
        <div>
            <h1>Create A Synth</h1>
            <p>This is the create a synth placeholder</p>
            <Link to="/synth-detail">Create Synth</Link>
            {/* Will have functionality using handleCreate() and useNavigate() */}
        </div>
    )
}