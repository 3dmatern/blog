import React from "react";
import { useParams } from "react-router-dom";
import { articleDate } from "../../utils/formatDate";
import Comments from "../ui/comments";
import { useSelector } from "react-redux";
import { getArticleById } from "../../store/articles";

const ArticlePage = () => {
    const { articleId } = useParams();
    const article = useSelector(getArticleById(articleId));

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
