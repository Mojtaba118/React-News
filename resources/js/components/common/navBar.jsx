import React from "react";
const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand">
            <div className="navbar-brand" href="#">
                <i className="fas fa-bars hamburger ml-5"></i>
                <a href="#" className="navbar-brand-link">پنل ادمین</a>
            </div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <input type="checkbox" id="theme"/>
                </li>
                <li className="nav-item">
                    <a href="/logout" className="nav-link">Logout</a>
                </li>
            </ul>

        </nav>)
};

export default NavBar;
