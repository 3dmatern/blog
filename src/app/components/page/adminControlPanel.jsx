import React from "react";
import { Link } from "react-router-dom";
import ArticlesListPage from "./articlesListPage";

const AdminControlPanel = () => {
    return (
        <>
            <div className="d-flex align-items-center mb-2">
                <h1>Статьи</h1>
                <div className="ms-auto">
                    <Link to="create" className="btn btn-outline-dark btn-sm">
                        Создать статью
                    </Link>
                </div>
            </div>
            <ArticlesListPage isAdmin={true} />
        </>
    );
};

export default AdminControlPanel;
