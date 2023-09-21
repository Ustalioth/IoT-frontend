import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import TokenService from "services/token.service";
import MyNavBar from "components/navbar/MyNavBar";
import ControlPad from "components/control-pad/ControlPad";
import { Container } from "react-bootstrap";
import VideoFrame from "components/video/video-frame";
import Chat from "components/chat/Chat";
import { logout, setUser } from "features/authSlice";
import AuthService from "services/auth.service";

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const [chat, setChat] = useState([]);

    const handleGetRefreshToken = () => {
        AuthService.refreshToken()
            .then(({data}) => {
                TokenService.updateLocalAccessToken(data.content.body.credentials.token)
                dispatch(setUser({...user, token: data.content.body.credentials.token}));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        /*
        if (!isAuthenticated || !TokenService.isTokenValid(TokenService.getLocalRefreshToken())) {
            dispatch(logout);
            return navigate("/signin", { replace: true });
        }
        */
    }, []);

    return (
        <>
            <MyNavBar />
            <h1>{t('home.title')}</h1>
            <Container className="d-flex">
                <VideoFrame />
                <ControlPad chat={chat} setChat={setChat} />
            </Container>
            <Chat content={chat} setContent={setChat} />
            <button onClick={handleGetRefreshToken}>get a refresh token test</button>
        </>
    );
}

export default Home;