import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import VideoService from "services/video.service";
import Pusher from "pusher-js";

const VideoFrame = () => {

    const videoRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    const pusher = new Pusher('3f4cfee58cf9b6395df8', {
        cluster: 'eu'
    });

    useEffect(() => {
        const channel = pusher.subscribe('image'); // Replace with your channel name
        channel.bind('image', (data) => {
            console.log(data)
        });

        return () => {
            channel.unbind(); // Unsubscribe when the component unmounts
        };
    }, []);

    useEffect(() => {
        VideoService.getVideoStream()
            .then(response => {
                videoRef.current.src = window.URL.createObjectURL(response.blob());
            })
            .catch(err => setErrMsg(`Error fetching video stream: ${err}`))
    }, []);

    return (
        <Container>
            <h3>Video stream</h3>
            <video ref={videoRef} controls autoPlay />
            {
                (errMsg?.length > 0) && <p>{errMsg}</p>
            }
        </Container>
    );
}

export default VideoFrame;