import React from "react";
import FormAddComment from "../common/comments/formAddComment";
import { orderBy } from "lodash";
import CommentsList from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";
import {
    createComment,
    removeComment,
    selectCommentsByArticleId,
} from "../../store/comments";

const Comments = ({ articleId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    const comments = useSelector((state) =>
        selectCommentsByArticleId(state, articleId)
    );

    const handleSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                article_id: articleId,
                user_id: currentUser._id,
            })
        );
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            {currentUser && (
                <div className="card mb-2">
                    {" "}
                    <div className="card-body ">
                        <FormAddComment onSubmit={handleSubmit} />
                    </div>
                </div>
            )}
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
