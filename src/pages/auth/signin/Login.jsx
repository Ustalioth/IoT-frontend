import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imageCover from "assets/auto.jpg";
import AuthService from "services/auth.service";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from 'features/authSlice';
import TokenService from "services/token.service";


const Login = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        AuthService.login(credentials)
            .then(({data}) => {
                dispatch(setUser(data?.content?.body));
                if (data?.content?.body?.credentials?.token) {
                    TokenService.updateLocalAccessToken(data?.content?.body?.credentials?.token);
                    TokenService.updateLocalRefreshToken(data?.content?.body?.credentials?.refreshToken);
                }
            })
            .catch(err => dispatch(setError(`${t('auth.fail')}`)))
            .finally(() => dispatch(setLoading(false)));
    }

    useEffect(() => {
        if (isAuthenticated && TokenService.isTokenValid(TokenService.getLocalAccessToken())) {
            return navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(setError(''));
    }, [dispatch]);

    return (
        <>
            <h1 className="mb-4 text-center">FantastiCar</h1>
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-xs-12 col-md-6 d-none d-md-block">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <img src={imageCover} alt={t('auth.login_title')} className="h-100 mw-100" />
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6 d-flex justify-content-center align-items-center">
                        <div className="h-100">
                            <h2 className="mb-4">{t('auth.login')}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">{t('auth.email')}</label>
                                    <input type="email" name="email" value={credentials.email || ''} onChange={handleChange} className="form-control" id="email" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">{t('auth.password')}</label>
                                    <input type="password" name="password" value={credentials.password || ''} onChange={handleChange} className="form-control" id="password" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4" disabled={loading}>
                                    {loading ?  t('action.logging_in') : t('action.signin')}
                                </button>
                                {(error?.length > 0) && <div class="alert alert-danger" role="alert">{error}</div>}   
                            </form>
                            <hr />
                            <h2>{t('action.register_now')}</h2>
                            <Link to={"/signup"}>
                                <button type="button" className="btn btn-primary btn-block mb-4">
                                    {t('action.signup')}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;