import React from "react";
import { useParams } from "react-router-dom";
import FormSignUp from "../components/ui/formSignUp";
import FormSignIn from "../components/ui/formSignIn";

const Sign = () => {
    const { type } = useParams();
    return (
        <div className="row">
            <div className="col-md-6 mx-auto shadow p-4">
                <>
                    <h3 className="text-center mb-4">
                        {type === "register" ? "Регистрация" : "Авторизация"}
                    </h3>
                    {type === "register" ? <FormSignUp /> : <FormSignIn />}
                </>
            </div>
        </div>
    );
};

export default Sign;
