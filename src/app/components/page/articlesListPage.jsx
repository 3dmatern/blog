import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getArticles, removeArticle } from "../../store/articles";

const ArticlesListPage = ({ isAdmin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const articles = useSelector(getArticles());
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const handleDelete = (articleId) => {
        dispatch(removeArticle(articleId));
    };

    const handleEdit = (articleId) => {
        navigate(`edit/${articleId}`);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (articles) {
        // метод разделения постов по страницам
        const postCrop = paginate(articles, currentPage, pageSize);
        return (
            <>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {postCrop.map((post) => (
                        <div className="col" key={post._id}>
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
                                        {post.shortTitle}
                                    </h5>
                                    {isAdmin && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn-close position-absolute top-0 start-100 translate-middle"
                                                aria-label="Close"
                                                onClick={() =>
                                                    handleDelete(post._id)
                                                }
                                            ></button>
                                            <button
                                                type="button"
                                                className="btn position-absolute top-100 start-100 translate-middle"
                                                onClick={() =>
                                                    handleEdit(post._id)
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
                                                {post.shortContent}
                                            </p>
                                            <Link
                                                to={`/article/${post._id}`}
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
