import React from "react";

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand sticky-top">
            <div className="navbar-brand" href="#">
                <i className="fas fa-bars hamburger ml-5"></i>
                <a href="#" className="navbar-brand-link">پنل ادمین</a>
            </div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item ml-3">
                    <input type="checkbox" id="theme"/>
                </li>
                <li className="nav-item mr-3">
                    <a href="/logout" className="nav-link"><i className="fas fa-sign-out-alt"></i></a>
                </li>
            </ul>

        </nav>)
};

export default NavBar;
