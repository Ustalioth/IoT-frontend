import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import TokenService from "services/token.service";
import MyNavBar from "components/navbar/MyNavBar";
import ControlPad from "components/control-pad/ControlPad";
import VideoFrame from "components/video/video-frame";
import Chat from "components/chat/Chat";
import { logout } from "features/authSlice";
import Pusher from 'pusher-js';

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [chat, setChat] = useState([]);

    const pusher = new Pusher('3f4cfee58cf9b6395df8', {
        cluster: 'eu'
    });

    useEffect(() => {
        const channel = pusher.subscribe('obstacle'); // Replace with your channel name
        channel.bind('obstacle', (data) => {
            alert('OBSTACLE !!!!!')
        });

        return () => {
            channel.unbind(); // Unsubscribe when the component unmounts
        };
    });

    useEffect(() => {
        if (!isAuthenticated || !TokenService.isTokenValid(TokenService.getLocalRefreshToken())) {
            dispatch(logout);
            return navigate("/signin", { replace: true });
        }
    });

    return (
        <>
            <MyNavBar />
            <h1 className="text-center">{t('home.title')}</h1>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-6 text-center">
                        <VideoFrame />
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <ControlPad chat={chat} setChat={setChat} />
                    </div>
                </div>
            </div>
            <Chat content={chat} setContent={setChat} />
        </>
    );
}

export default Home;