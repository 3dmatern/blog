export function generateAuthError(message) {
    switch (message) {
        case "INVALID_DATA":
            return "Email или пароль введены некорректно";
        case "INVALID_PASSWORD":
            return "Пароль введен некорректно";
        case "EMAIL_EXISTS":
            return "Пользователь с такми Email уже существует";
        case "EMAIL_NOT_FOUND":
            return "Email не существует";

        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
