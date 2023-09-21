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
        //console.log(user);
    };

    return (
        <>
            <h1>{t('action.register_title')}</h1>
            {errMsg?.length && <Alert variant="danger">{errMsg}</Alert>}
            <form>
                <UserForm user={user} setUser={setUser} />
                <button onClick={handleSubmit}>{t('action.register')}</button>
            </form>
        </>
    );
}

export default Register;