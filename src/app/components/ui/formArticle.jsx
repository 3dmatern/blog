import React from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { getTags } from "../../store/tag";
import MultiSelectField from "../common/form/multiSelectField";

const FormArticle = ({ data, tagsArticle, onSubmit }) => {
    const { form, handleChange, handleSubmit, errors, isValid } = useForm(
        data,
        onSubmit
    );
    const tags = useSelector(getTags());

    if (tags) {
        return (
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Название статьи"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    error={errors.title}
                    autoFocus
                />
                <TextField
                    label="Короткое название статьи"
                    name="shortTitle"
                    value={form.shortTitle}
                    placeholder="Рекомендуется не более 50 символов"
                    onChange={handleChange}
                    error={errors.shortTitle}
                />
                <TextAreaField
                    label="Короткий текст статьи"
                    name="shortContent"
                    value={form.shortContent}
                    placeholder="Рекомендуется не более 70 символов"
                    onChange={handleChange}
                    error={errors.shortContent}
                />
                <TextAreaField
                    label="Полный текст статьи"
                    name="content"
                    value={form.content}
                    rows="6"
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="mb-3">
                    <MultiSelectField
                        label="Выберите сервисы и удобства"
                        name="tags"
                        defaultValue={data && form.tags}
                        onChange={handleChange}
                        options={tags}
                    />
                </div>
                <div className="d-grid gap-2 col-3 mx-auto">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        );
    }
};
FormArticle.propTypes = {
    data: PropTypes.object,
    onSubmit: PropTypes.func,
};
export default FormArticle;
