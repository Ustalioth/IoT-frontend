import axios from "axios";
import { instance as api } from "./api";
import TokenService from "./token.service";

const AuthService = {
    login: (credentials) => {
        return axios.post(
            `${process.env.REACT_APP_URL}/api/accounts/sign-in`,
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            }
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
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TokenService.getLocalRefreshToken()}`,
                }
            }
        )
    }
}

export default AuthService;