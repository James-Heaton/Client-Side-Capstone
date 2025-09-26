import { CreateSynthForm } from "../forms/CreateSynthForm"

export const CreateASynth = () => {
    return (
        <div className="create-synth">
            
            <div className="create-synth-form">
                <h1 className="create-header">Create A Synth</h1>
                <CreateSynthForm />
            </div>
            
        </div>
    )
}