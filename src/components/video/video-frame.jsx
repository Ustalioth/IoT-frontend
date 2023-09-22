import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Pusher from "pusher-js";
import axios from 'axios';

const VideoFrame = () => {

    const videoRef = useRef();

    const [video, setVideo] = useState(null);

    const pusher = new Pusher('3f4cfee58cf9b6395df8', {
        cluster: 'eu'
    });

    useEffect(() => {
        const channel = pusher.subscribe('image'); // Replace with your channel name
        channel.bind('image', async (data) => {
            const image = await axios.get("https://backend.groupe2.learn-it.ovh/api/images/latest")
            console.log(image.data.content.body.image)
            setVideo(image.data.content.body.image);
        });

        return () => {
            channel.unbind(); // Unsubscribe when the component unmounts
        };
    }, []);

    return (
        <Container>
            <h3>Video stream</h3>
            {
                video ? (<img src={`data:image/jpeg;base64,${video}`} alt='test'/>)  : (<></>)
            }
        </Container>
    );
}

export default VideoFrame;