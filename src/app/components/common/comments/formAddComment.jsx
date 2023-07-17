import React, { useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";

const FormAddComment = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
        setErrors({});
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Комментарий не может быть пустым",
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({ content: "" });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextAreaField
                label="Оставить комментарий:"
                name="content"
                value={data.content}
                onChange={handleChange}
                error={errors.content}
            />
            <div className="d-grid gap-2 col-4 ms-auto">
                <button type="submit" className="btn btn-primary">
                    Отправить
                </button>
            </div>
        </form>
    );
};
FormAddComment.propTypes = {
    onSubmit: PropTypes.func,
};
export default FormAddComment;
