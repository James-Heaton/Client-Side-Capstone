import { CreateSynthForm } from "../forms/CreateSynthForm"

export const CreateASynth = () => {
    return (
        <div className="create-synth">
            <h1 className="create-header">Create A Synth</h1>
            <div className="create-synth-form">
                <CreateSynthForm />
            </div>
            
        </div>
    )
}