import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Pusher from "pusher-js";

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
            console.log(image)
            setVideo(data);
        });

        return () => {
            channel.unbind(); // Unsubscribe when the component unmounts
        };
    }, []);

    useEffect(() => {
        const blob = new Blob([video], { type: 'video/mp4' });
        const url = window.URL.createObjectURL(blob);
        videoRef.current.src = url;

        return () => {
            URL.revokeObjectURL(url);
          };
    }, [video]);

    return (
        <Container>
            <h3>Video stream</h3>
            <video ref={videoRef} controls autoPlay>
                Your browser does not support the video tag.
            </video>
        </Container>
    );
}

export default VideoFrame;