import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import VideoService from "services/video.service";

const VideoFrame = () => {

    const videoRef = useRef();

    const [errMsg, setErrMsg] = useState('');

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
                errMsg?.length && <p>{errMsg}</p>
            }
        </Container>
    );
}

export default VideoFrame;