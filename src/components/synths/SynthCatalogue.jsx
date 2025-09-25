import "./SynthCatalogue.css"
import { SynthCard } from "./SynthCard"

export const SynthCatalogue = () => {
    return (
        <div className="synth-catalogue">
            <h1 className="catalogue-header">Synth Catalogue</h1>
            <div className="synth-catalogue-cards">
                <SynthCard />
            </div>
        </div>
    )
}