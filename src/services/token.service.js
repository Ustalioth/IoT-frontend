const TokenService = {
    getLocalRefreshToken: () => {
        const refreshToken = window.localStorage.getItem("refreshToken");
        return refreshToken;
    },

    updateLocalRefreshToken: (refreshToken) => {
        window.localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    },
 
    getLocalAccessToken: () => {
        const accessToken = window.localStorage.getItem("accessToken");
        return accessToken;
    },

    updateLocalAccessToken: (accessToken) => {
        window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
    },
    
}

export default TokenService;