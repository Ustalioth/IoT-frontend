import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import MyNavBar from "components/navbar/MyNavBar";
import ControlPad from "components/control-pad/ControlPad";
import { Container } from "react-bootstrap";
import VideoFrame from "components/video/video-frame";
import Chat from "components/chat/Chat";

const Home = () => {
    const { t } = useTranslation();

    const [chat, setChat] = useState([]);

    return (
        <>
            <MyNavBar />
            <h1>{t('home.title')}</h1>
            <Container className="d-flex">
                <VideoFrame />
                <ControlPad chat={chat} setChat={setChat} />
            </Container>
            <Chat content={chat} setContent={setChat} />
        </>
    );
}

export default Home;