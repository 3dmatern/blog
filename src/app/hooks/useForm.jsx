import { useEffect, useState } from "react";
import { validator } from "../utils/validator";

export const useForm = (
    initialState = {
        title: "",
        shortTitle: "",
        shortContent: "",
        content: "",
        tags: [],
    },
    onSubmit
) => {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        title: {
            isRequired: {
                message: "Поле не может быть пустым",
            },
        },
        shortTitle: {
            isRequired: {
                message: "Поле не может быть пустым",
            },
        },
        shortContent: {
            isRequired: {
                message: "Поле не может быть пустым",
            },
        },
        content: {
            isRequired: {
                message: "Поле не может быть пустым",
            },
        },
    };

    const validate = () => {
        const errors = validator(form, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        onSubmit(form);
    };
    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
    return {
        form,
        handleChange,
        handleSubmit,
        errors,
        isValid,
    };
};
