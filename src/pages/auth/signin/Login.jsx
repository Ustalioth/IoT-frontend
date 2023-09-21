import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import imageCover from "assets/auto.jpg";
import AuthService from "services/auth.service";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from 'features/authSlice';
import TokenService from "services/token.service";


const Login = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [credentials, setCredentials] = useState({"email": "", "password": ""});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        AuthService.login(credentials)
            .then(response => {
                dispatch(setUser(response?.content?.body));
                if (response?.content?.body?.credentials?.token) {
                    TokenService.updateLocalAccessToken(response?.content?.body?.credentials?.token);
                    TokenService.updateLocalRefreshToken(response?.content?.body?.credentials?.refreshToken);
                }
            })
            .catch(err => dispatch(setError(`${t('auth.fail')}, ${err}`)))
            .finally(() => dispatch(setLoading(false)));
    }

    return (
        <>
            <div className="container border border-primary">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <img src={imageCover} alt={t('auth.login_title')} className="h-100 mw-100" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                        <div className="h-100">
                            <h1>{t('auth.login')}</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>{t('auth.email')}:</label>
                                    <input type="text" name="email" value={credentials.email || ''} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>{t('auth.password')}:</label>
                                    <input type="text" name="password" value={credentials.password || ''} onChange={handleChange} />
                                </div>
                                <button type="submit" disabled={loading}>
                                    {loading ?  t('action.logging_in') : t('action.signin')}
                                </button>
                                {error && <p className="error">{error}</p>}   
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;