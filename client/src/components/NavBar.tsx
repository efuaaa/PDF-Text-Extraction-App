import "../assets/styles/NavBar.css";
import logo from "../assets/images/text.png";
import NavBarTabs from "./NavBarTabs";


const NavBar = () => {
    return (
        <div className="nav-responsive-view">
            <div className="navbar-container">
                <nav className="navbar">
                    <img
                        src={logo}
                        alt="logo"
                        style={{ width: "40px", height: "40px" }}
                    />
                    <div className="navbar-logo">
                        extExtract
                    </div>

                </nav>
                <NavBarTabs />
            </div>
        </div>
    )
}

export default NavBar