import axios from "axios";
import { instance as api } from "./api";
import TokenService from "./token.service";

const AuthService = {
    login: (credentials) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        return axios.post(
            `${process.env.REACT_APP_URL}/api/accounts/sign-in`,
            credentials,
            { headers}
        )
    },

    logout: () => {
        api.post("/accounts/sign-out")
            .then(response => {
                TokenService.removeUser();
            });
    },

    signup: (user) => {
        return axios.post(process.env.REACT_APP_URL + "/api/accounts", user);
    },

    refreshToken: async () => {
        return await axios.post(
            process.env.REACT_APP_URL + "/api/accounts/refresh-token",
            {
                'headers': {
                    'Authorization': `Bearer ${TokenService.getLocalRefreshToken()}`,
                    'Content-Type': 'application/json',
                }
            }
        )
    }
}

export default AuthService;