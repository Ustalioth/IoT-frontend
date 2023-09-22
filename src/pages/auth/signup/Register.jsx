import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError } from 'features/authSlice';
import UserForm from "../user/UserForm";
import AuthService from "services/auth.service";
import TokenService from "services/token.service";


const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [newUser, setNewUser] = useState({locale: 'en', keep_logging: false});
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        AuthService.signup(newUser)
            .then(({data}) => {
                dispatch(setError(''))
                dispatch(setUser(data.content.body));
                TokenService.updateLocalAccessToken(data.content.body.credentials.token);
                TokenService.updateLocalRefreshToken(data.content.body.credentials.refreshToken);
            })
            .catch(err => dispatch(setError(`${t('auth.fail')}`)))
            .finally(() => dispatch(setLoading(false)));
    };

    useEffect(() => {
        if (isAuthenticated) {
            return navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <div className="container">
                <h1 className="text-center">{t('action.register_title')}</h1>
                <div className="container">
                    {(error?.length > 0) && <div class="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <UserForm user={newUser} setUser={setNewUser} />
                        <div className="container text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                {loading ?  t('action.logging_in') : t('action.signin')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;