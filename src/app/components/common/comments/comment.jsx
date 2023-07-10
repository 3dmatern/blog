import React from "react";
import PropTypes from "prop-types";
import { commentDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import { getCurrentUser, getUserById } from "../../../store/users";

const Comment = ({ user_id, created_at, content, onRemove }) => {
    const currentUser = useSelector(getCurrentUser());
    const user = useSelector(getUserById(user_id));

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user.login}
                                        <span className="small text-primary">
                                            - {commentDate(created_at)}
                                        </span>
                                    </p>
                                    {currentUser &&
                                        (currentUser._id === user_id ||
                                            currentUser.role === "ADMIN") && (
                                            <button
                                                onClick={onRemove}
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    userId: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: PropTypes.string,
    onRemove: PropTypes.func,
};

export default Comment;
