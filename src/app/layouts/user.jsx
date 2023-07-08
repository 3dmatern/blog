import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/users";

const User = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const currentUser = useSelector(getCurrentUser());

    useEffect(() => {
        if (userId && !currentUser) {
            navigate("/");
        } else if (userId !== currentUser._id) {
            navigate(`/user/${currentUser._id}`);
        } else {
        }
    }, [userId, currentUser, navigate]);

    return (
        <div className="row gutters-sm justify-content-center">
            <h3 className="text-center mb-4">Профиль</h3>
            {currentUser && <UserPage user={currentUser} />}
        </div>
    );
};

export default User;
