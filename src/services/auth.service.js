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
                    "Content-Type": "application/json",
                }
            }
        )
    },

    logout: () => {
        api.post("/accounts/sign-out")
            .then(response => {
                
            })
            .catch(err => console.log(err))
            .finally(() => {
                TokenService.deleteLocalAccessToken();
                TokenService.deleteLocalRefreshToken();
            });
    },

    signup: (user) => {
        return axios.post(process.env.REACT_APP_URL + "/api/accounts", 
        user,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
    },

    refreshToken: async () => {
        return await axios.post(
            `${process.env.REACT_APP_URL}/api/accounts/refresh-token`,
            null,
            {
                headers: {
                    'Authorization': `Bearer ${TokenService.getLocalRefreshToken()}` 
                }
            }
        )
    }
}

export default AuthService;