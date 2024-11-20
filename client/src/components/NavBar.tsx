import "../assets/styles/NavBar.css";
import logo from "../assets/images/text.png";
import Tabs from "./Tabs";


const NavBar = () => {
    return (
        <div className="navbar-container">
            {/* Navbar */}
            <nav className="navbar">
                <img
                    src={logo}
                    alt="logo"
                    style={{ width: "40px", height: "40px" }}
                />
                <div className="navbar-logo">
                    extExtract
                </div>
                <Tabs />
            </nav>
        </div>
    )
}

export default NavBar