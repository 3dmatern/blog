import React from "react";
import { useNavigate } from "react-router-dom";
import FormPost from "../ui/formArticle";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../store/articles";
import { getCurrentUser } from "../../store/users";
import { createArticleTag } from "../../store/articleTag";

const CreateArticle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());

    const handleSubmit = async (data) => {
        const tags = data.tags;
        delete data.tags;
        const articleId = dispatch(
            createArticle({
                payload: { ...data, author_id: currentUser._id },
                navigate,
            })
        );
        const article_id = await Promise.resolve(articleId);

        tags.map((t) =>
            dispatch(createArticleTag({ article_id, tag_id: t._id }))
        );
    };
    return (
        <>
            <div className="mb-4">
                <h1>Добавление статьи</h1>
            </div>
            <FormPost onSubmit={handleSubmit} />
        </>
    );
};

export default CreateArticle;
