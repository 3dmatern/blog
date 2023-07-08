import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormArticle from "../ui/formArticle";
import { useDispatch, useSelector } from "react-redux";
import { getArticleById, updateArticle } from "../../store/articles";
import { getCurrentUser } from "../../store/users";

const EditArticle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    const { articleId } = useParams();
    const article = useSelector(getArticleById(articleId));

    useEffect(() => {
        if (!currentUser || (currentUser && currentUser.role !== "ADMIN")) {
            navigate("/");
            return;
        }
    }, [currentUser]);

    const handleSubmit = (data) => {
        dispatch(updateArticle({ payload: data, navigate }));
    };

    return (
        <>
            <div className="mb-4">
                <h1>Редактрование статьи</h1>
            </div>
            <FormArticle data={article} onSubmit={handleSubmit} />
        </>
    );
};

export default EditArticle;
