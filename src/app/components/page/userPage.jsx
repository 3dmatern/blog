import React from "react";
import PropTypes from "prop-types";
import FormEditUser from "../ui/formEditUser";

const UserPage = ({ user }) => {
    return user ? (
        <>
            <div className="col-md-4 mb-3">
                <p></p>
                <p></p>
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center position-relative">
                            <img
                                src={user.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="165"
                                height="165"
                            />
                            <div className="mt-3">
                                <p>
                                    Логин:{" "}
                                    <span className="text-primary">
                                        {user.login}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <FormEditUser user={user} />
            </div>
        </>
    ) : (
        <div className="row justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string,
};
export default UserPage;
