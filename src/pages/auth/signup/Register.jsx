import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UserForm from "../user/UserForm";
import AuthService from "services/auth.service";
import { Alert } from "react-bootstrap";


const Register = () => {

    const { t } = useTranslation();

    const [user, setUser] = useState({});
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthService.signup(user)
            .then(response => {
                setErrMsg('');
            })
            .catch(err => setErrMsg(err));
    };

    return (
        <>
            <h1 className="text-center">{t('action.register_title')}</h1>
            <div className="container">
                {(errMsg?.length > 0) && <Alert variant="danger">{errMsg}</Alert>}
                <form onSubmit={handleSubmit}>
                    <UserForm user={user} setUser={setUser} />
                    <div className="container text-center">
                        <button type="button" className="btn btn-primary btn-block">{t('action.register')}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;