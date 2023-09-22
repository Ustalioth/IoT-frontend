import { instance as api } from "./api";


const VideoService = {
    getVideoStream: () => api.get("/images/xxx"),
}

export default VideoService;