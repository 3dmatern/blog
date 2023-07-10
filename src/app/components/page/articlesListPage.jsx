import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getArticles, removeArticle } from "../../store/articles";
import parseUrl from "parse-url";
import { getTags } from "../../store/tag";
import { getArticleTags, removeArticleTag } from "../../store/articleTag";

const ArticlesListPage = ({ isAdmin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const url = `${window.location.origin}${location.pathname}${location.search}`;
    const { query: tag } = parseUrl(url);

    const tags = useSelector(getTags());
    const articleTags = useSelector(getArticleTags());
    const articles = useSelector(getArticles());
    const [filterArticles, setFilterArticles] = useState(articles);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        if (tag.tag !== undefined && tags && articleTags) {
            let filtered = [];
            const tagId = tags[tags.findIndex((t) => t.value === tag.tag)]._id;
            const articleIds = articleTags.map(
                (at) => at.tag_id === tagId && at.article_id
            );
            articleIds.map((a) =>
                articles.map(
                    (article) => article._id === a && filtered.push(article)
                )
            );
            setFilterArticles(filtered);
        } else {
            setFilterArticles(articles);
        }
    }, [tag]);

    const handleDelete = (articleId) => {
        dispatch(removeArticle(articleId));
        dispatch(removeArticleTag(articleId));
    };

    const handleEdit = (articleId) => {
        navigate(`edit/${articleId}`);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (filterArticles && tags) {
        // метод разделения постов по страницам
        const articleCrop = paginate(filterArticles, currentPage, pageSize);
        return (
            <>
                <div className="text-center mb-3">
                    {tags.map((t) => (
                        <span key={t.value}>
                            <Link
                                className="btn btn-sm btn-secondary"
                                to={`/?tag=${t.label}`}
                            >
                                {t.value}
                            </Link>{" "}
                        </span>
                    ))}
                    {tag.tag !== undefined && (
                        <Link className="btn btn-sm btn-warning" to="/">
                            Сбросить
                        </Link>
                    )}
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {articleCrop.map((article) => (
                        <div className="col" key={article._id}>
                            <div
                                className="card mx-auto"
                                style={{ width: "18rem" }}
                            >
                                <div
                                    className={
                                        "card-body" +
                                        (isAdmin ? " position-relative" : "")
                                    }
                                >
                                    <h5 className="card-title">
                                        {article.shortTitle}
                                    </h5>
                                    {isAdmin && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn-close position-absolute top-0 start-100 translate-middle"
                                                aria-label="Close"
                                                onClick={() =>
                                                    handleDelete(article._id)
                                                }
                                            ></button>
                                            <button
                                                type="button"
                                                className="btn position-absolute top-100 start-100 translate-middle"
                                                onClick={() =>
                                                    handleEdit(article._id)
                                                }
                                            >
                                                <i
                                                    className={"bi bi-pencil"}
                                                ></i>
                                            </button>
                                        </>
                                    )}
                                    {!isAdmin && (
                                        <>
                                            {" "}
                                            <p className="card-text">
                                                {article.shortContent}
                                            </p>
                                            <Link
                                                to={`/article/${article._id}`}
                                                className="btn btn-primary w-100"
                                            >
                                                Открыть
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    itemsCount={articles.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    } else {
        return (
            <div
                className="spinner-border text-primary text-center"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }
};

ArticlesListPage.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

export default ArticlesListPage;
