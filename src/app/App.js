import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import ArticlePage from "./components/page/articlePage";
import NotFound from "./components/page/notFound";
import Sign from "./layouts/sign";
import Admin from "./layouts/admin";
import User from "./layouts/user";
import EditArticle from "./components/page/editArticle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./layouts/logout";
import DataLoader from "./components/ui/hoc/dataLoader";

function App() {
    return (
        <div className="container">
            <DataLoader>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/sign/:type?" element={<Sign />} />
                    <Route path="/user/:userId?" element={<User />} />
                    <Route path="/admin/:create?" element={<Admin />} />
                    <Route
                        path="/admin/edit/:articleId?"
                        element={<EditArticle />}
                    />
                    <Route
                        path="/article/:articleId"
                        element={<ArticlePage />}
                    />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </DataLoader>

            <ToastContainer />
        </div>
    );
}

export default App;
