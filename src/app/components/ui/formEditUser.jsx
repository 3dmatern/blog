import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/users";

const initialState = {
    password: "",
    confirmPassword: "",
};

const FormEditUser = ({ user }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const validatorConfig = {
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
        confirmPassword: {
            isRequired: {
                message: "Подтвердите новый пароль",
            },
            isConfirm: {
                message: "Пароли не сопадают",
                password: data.password,
                confirm: data.confirmPassword,
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

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser(user._id, { password: data.password }));
        setData(initialState);
    }

    return user ? (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Новый пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
                autoFocus
            />
            <TextField
                label="Подтвердите новый пароль"
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
            />
            <div className="d-grid gap-2 col-10 mt-4 mx-auto">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                >
                    Обновить пароль
                </button>
            </div>
        </form>
    ) : (
        <h2>Загрузка...</h2>
    );
};

FormEditUser.propTypes = {
    user: PropTypes.object,
};

export default FormEditUser;
