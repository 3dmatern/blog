import React from "react";
import { useNavigate } from "react-router-dom";
import FormPost from "../ui/formArticle";
import { useDispatch } from "react-redux";
import { createArticle } from "../../store/articles";

const CreateArticle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        dispatch(createArticle({ payload: data, navigate }));
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
