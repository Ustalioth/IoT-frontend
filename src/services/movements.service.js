import { instance as api } from './api';

const MovementsService = {
    moveForward: () => api.post("/movements/forward"),
    moveBackward: () => api.post("/movements/backward"),
    moveLeft: () => api.post("/movements/left"),
    moveRight: () => api.post("/movements/right"),
    Stop: () => api.post("/movements/stop"),
    Exit: () => api.post("/movements/exit"),
}

export default MovementsService;