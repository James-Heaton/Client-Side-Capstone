import { SynthCard } from "./SynthCard"

export const SynthCatalogue = () => {
    return (
        <div className="synth-catalogue">
            <h1>Synth Catalogue</h1>
            <div className="synth-catalogue-cards">
                <SynthCard />
            </div>
        </div>
    )
}