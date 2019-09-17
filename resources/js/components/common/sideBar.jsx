import React, {Component} from "react";
import {Link} from "react-router-dom";
import {onSideBarItemChanged} from "../../admin";


class sideBar extends Component {
    componentDidMount() {
        onSideBarItemChanged();
    }

    render() {
        return (
            <div className="col-12 col-md-2 px-0 sideBar">
                <ul className="menu">
                    <li className="header-item activeHeader">
                        <a href="#user" className="menu-link collapsed" data-toggle="collapse">
                            <i className="fas fa-users"></i>کاربران
                            <i className="fas fa-chevron-left mr-auto ml-3"></i>
                        </a>
                        <ul className="menu collapse" id="user">
                            <li className="menu-item activeItem">
                                <Link to="/admin/" className="menu-link">
                                    <i className="fas fa-user"></i>لیست کاربران</Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/admin/user/add" className="menu-link">
                                    <i className="fas fa-user-plus"></i>افزودن کاربر</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="header-item header">
                        <a href="#post" className="menu-link collapsed" data-toggle="collapse">
                            <i className="fas fa-book-reader"></i>مقالات
                            <i className="fas fa-chevron-left mr-auto ml-3"></i>
                        </a>
                        <ul className="menu collapse" id="post">
                            <li className="menu-item">
                                <Link to="/admin/articles" className="menu-link">
                                    <i className="fas fa-book"></i>لیست مقالات</Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/admin/article/add" className="menu-link">
                                    <i className="fas fa-book-medical"></i>افزودن مقاله</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default sideBar;
