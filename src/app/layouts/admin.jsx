import React, { useEffect } from "react";
import AdminControlPanel from "../components/page/adminControlPanel";
import { useNavigate, useParams } from "react-router-dom";
import CreateArticle from "../components/page/createArticle";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/users";

const Admin = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(getCurrentUser());
    const { create } = useParams();

    useEffect(() => {
        if (!currentUser || currentUser.role !== "ADMIN") {
            navigate("/");
            return;
        }
    }, [currentUser]);

    return create === "create" ? <CreateArticle /> : <AdminControlPanel />;
};

export default Admin;
