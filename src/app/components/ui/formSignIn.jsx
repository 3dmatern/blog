import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/users";

const initialLogin = { email: "", password: "" };

const FormSignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(initialLogin);
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения",
            },
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения",
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
        setEnterError(null);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(signIn({ payload: data, navigate }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                placeholder="Введите электронную почту"
                onChange={handleChange}
                error={errors.email}
                autoFocus
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                placeholder="Введите пароль"
                onChange={handleChange}
                error={errors.password}
            />
            {enterError && <p className="text-danger">{enterError}</p>}
            <div className="d-grid gap-2 col-6 mt-4 mx-auto">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid || enterError}
                >
                    Войти
                </button>
            </div>
        </form>
    );
};

export default FormSignIn;
