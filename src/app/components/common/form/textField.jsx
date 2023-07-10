import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type = "text",
    name,
    value,
    placeholder,
    onChange,
    error,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-3">
            {label && <label htmlFor={name}>{label}</label>}
            <div className="input-group has-validation">
                <input
                    id={name}
                    type={showPassword ? "text" : type}
                    name={name}
                    value={value}
                    className={getInputClasses()}
                    placeholder={placeholder}
                    onChange={handleChange}
                    {...rest}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

export default TextField;
