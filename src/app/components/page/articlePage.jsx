import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articleDate } from "../../utils/formatDate";
import Comments from "../ui/comments";
import { useSelector } from "react-redux";
import { getArticleById } from "../../store/articles";
import { selectArticleTagsById } from "../../store/articleTag";
import { getTags } from "../../store/tag";

const ArticlePage = () => {
    const { articleId } = useParams();
    const article = useSelector(getArticleById(articleId));
    const articleTags = useSelector((state) =>
        selectArticleTagsById(state, articleId)
    );
    const tags = useSelector(getTags());
    const [tagsArticle, setTagsArticle] = useState([]);

    useEffect(() => {
        if (articleTags && tags) {
            let result = [];
            const tagIds = articleTags.map((at) => at.tag_id);
            tagIds.map((t) =>
                tags.map((tag) => tag._id === t && result.push(tag))
            );
            setTagsArticle(result);
        }
    }, [articleId, articleTags]);

    return article ? (
        <div className="row">
            <div className="col-md-8 mx-auto">
                <h1 className="mb-4">{article.title}</h1>
                <p>{article.content}</p>
                <p className="card-text">
                    <small className="text-body-secondary">
                        {articleDate(article.created_at)}
                    </small>
                </p>
                <div className="mb-3">
                    {tagsArticle.map((tag) => (
                        <span key={tag.value}>
                            <Link
                                className="btn btn-sm btn-secondary"
                                to={`/?tag=${tag.label}`}
                            >
                                {tag.value}
                            </Link>{" "}
                        </span>
                    ))}
                </div>
                <Comments articleId={articleId} />
            </div>
        </div>
    ) : (
        <div className="row justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default ArticlePage;
