export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapital": {
                const capitalSymbol = /[A-Z]+/g;
                statusValidate = !capitalSymbol.test(data);
                break;
            }
            case "isContainDigit": {
                const containDigit = /\d+/g;
                statusValidate = !containDigit.test(data);
                break;
            }
            case "minLogin": {
                statusValidate = data.length < config.value;
                break;
            }
            case "minPassword": {
                statusValidate = data.length < config.value;
                break;
            }
            case "isConfirm": {
                statusValidate = config.password !== config.confirm;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
