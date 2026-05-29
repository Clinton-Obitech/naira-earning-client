import { Link } from "react-router-dom"
import HomePic from "../assets/Homepic.png";
import Logo from "../assets/Logo.png";

export default function HomePage() {
    return (
        <div className="home">
            <div className="hero">
                <img 
                className="pic"
                src={HomePic} 
                alt="hero"
                />
                <img
                className="logo" 
                src={Logo} 
                alt="logo"
                />
            </div>
            <nav>
                <Link to="/create/user">create account</Link>
                <Link to="/login/user">login</Link>
            </nav>
        </div>
    )
}