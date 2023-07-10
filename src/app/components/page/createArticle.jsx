import React from "react";
import { useNavigate } from "react-router-dom";
import FormPost from "../ui/formArticle";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../store/articles";
import { getCurrentUser } from "../../store/users";

const CreateArticle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());

    const handleSubmit = (data) => {
        dispatch(
            createArticle({
                payload: { ...data, author_id: currentUser._id },
                navigate,
            })
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
