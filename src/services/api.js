import axios from "axios";
import TokenService from "./token.service";
import AuthService from "./auth.service";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_URL + "/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token.replace(/['"]+/g, '')}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
  
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const rs = await AuthService.refreshToken();
            const { accessToken } = rs.content.body.credentials.token;
            //window.localStorage.setItem("accessToken", accessToken);
            TokenService.updateLocalAccessToken(accessToken);
            instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken.replace(/['"]+/g, '')}`;
  
            return instance(originalConfig);
          } catch (_error) {
            if (_error?.response?.data) {
              return Promise.reject(_error.response.data);
            }
  
            return Promise.reject(_error);
          }
        }
  
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
  
      return Promise.reject(err);
    }
);

export default instance;