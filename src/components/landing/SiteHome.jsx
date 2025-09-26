import "./SiteHome.css"
import { Link } from "react-router-dom"

export const SiteHomeWelcome = () => {
    return (
        <div className="landing-whole">
            <div className="landing">
            <h1 className="header">Welcome to SynthFolio</h1>
            <div className="catchphrase">
                <p>A place to collect, create, & love</p> <p><Link to="/catalogue"><span className="catchphrase-link">Synthesizers</span></Link></p>
            </div>
        </div>
        </div>
        
    )
}