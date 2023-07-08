import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";

const initialRegister = { login: "", email: "", password: "" };

const FormSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(initialRegister);
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const validatorConfig = {
        login: {
            isRequired: {
                message: "Логин обязателен для заполнения",
            },
            minLogin: {
                message: "Логин должен состоять минимум из 3 символов",
                value: 3,
            },
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения",
            },
            isEmail: {
                message: "Email введен некорректно",
            },
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения",
            },
            isCapital: {
                message: "Пароль должен содержать минимум одну заглавную букву",
            },
            isContainDigit: {
                message: "Пароль должен содержать минимум одно число",
            },
            minPassword: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleChange = ({ target }) => {
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
        dispatch(signUp({ payload: data, navigate }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Логин"
                name="login"
                value={data.login}
                placeholder="Введите логин"
                onChange={handleChange}
                error={errors.login}
                autoFocus
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                placeholder="Введите электронную почту"
                onChange={handleChange}
                error={errors.email}
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
                    Регистрация
                </button>
            </div>
        </form>
    );
};

export default FormSignUp;
