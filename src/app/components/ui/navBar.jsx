import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";

const imgUrl = "/images/logo-blog.png";

const NavBar = () => {
    const currentUser = useSelector(getCurrentUser());
    return (
        <nav className="navbar navbar-expand-lg mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={imgUrl} width={107} alt="logo-blog" />
                </Link>
                <div className="justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {currentUser ? (
                        <div className="d-flex">
                            <NavProfile />
                        </div>
                    ) : (
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link px-0" to="/sign">
                                    Вход/
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link px-0"
                                    to="/sign/register"
                                >
                                    Регистрация
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
