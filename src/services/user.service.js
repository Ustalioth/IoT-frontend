import { instance as api } from './api';

const UserService = {
    getMyProfile: () => api.get(`/accounts/me`),

    updateProfile: (user) => api.patch(`/accounts/${user?.userId}`, user),
}

export default UserService;