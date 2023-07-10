import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormArticle from "../ui/formArticle";
import { useDispatch, useSelector } from "react-redux";
import { getArticleById, updateArticle } from "../../store/articles";
import { getCurrentUser } from "../../store/users";
import {
    removeArticleTag,
    selectArticleTagsById,
    updateArticleTag,
} from "../../store/articleTag";
import { getTags } from "../../store/tag";

const EditArticle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    const { articleId } = useParams();
    const article = useSelector(getArticleById(articleId));
    const articleTags = useSelector((state) =>
        selectArticleTagsById(state, articleId)
    );
    const tags = useSelector(getTags());
    const [data, setData] = useState(null);

    useEffect(() => {
        if (articleTags && tags) {
            let result = [];
            const tagIds = articleTags.map((at) => at.tag_id);
            tagIds.map((t) =>
                tags.map((tag) => tag._id === t && result.push(tag))
            );
            setData({ ...article, tags: result });
        }
    }, [articleId, articleTags]);

    useEffect(() => {
        if (!currentUser || (currentUser && currentUser.role !== "ADMIN")) {
            navigate("/");
            return;
        }
    }, [currentUser]);

    const handleSubmit = (data) => {
        const tags = data.tags;
        delete data.tags;
        dispatch(updateArticle({ payload: data, navigate }));

        tags.map((t) =>
            dispatch(updateArticleTag({ article_id: articleId, tag_id: t._id }))
        );
    };

    return (
        data && (
            <>
                <div className="mb-4">
                    <h1>Редактрование статьи</h1>
                </div>
                <FormArticle data={data} onSubmit={handleSubmit} />
            </>
        )
    );
};

export default EditArticle;
