import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUser());
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((prevState) => !prevState);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.login}</div>
                <img
                    src={currentUser.image}
                    alt="avatar"
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                {currentUser.role === "ADMIN" && (
                    <Link to={"/admin"} className="dropdown-item">
                        Админка
                    </Link>
                )}
                <Link to={`/user/${currentUser._id}`} className="dropdown-item">
                    Профиль
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Выход
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
