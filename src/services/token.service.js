const TokenService = {
  getLocalRefreshToken: () => {
      const refreshToken = window.localStorage.getItem("refreshToken");
      return JSON.parse(refreshToken);
  },

  updateLocalRefreshToken: (refreshToken) => {
      window.localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
  },

  deleteLocalRefreshToken: () => {
      window.localStorage.removeItem("refreshToken");
  },

  getLocalAccessToken: () => {
      const accessToken = window.localStorage.getItem("accessToken");
      return JSON.parse(accessToken);
  },

  updateLocalAccessToken: (accessToken) => {
      window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
  },

  deleteLocalAccessToken: () => {
      window.localStorage.removeItem("accessToken");
  },
  
  isTokenValid: (token) => {
      if (!token) {
          return false; // Token is missing or falsy
        }
      
        const tokenParts = token.split('.');
        
        if (tokenParts.length !== 3) {
          return false; // Token is not in the correct format
        }
      
        try {
          const payload = JSON.parse(atob(tokenParts[1])); // Decode the payload
          const expirationTimestamp = payload.exp;
      
          if (typeof expirationTimestamp !== 'undefined') {
            const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
            return expirationTimestamp > currentTime; // Check if token is not expired
          }
        } catch (error) {
          // An error occurred while parsing the token
        }

      return false;
  }
}

export default TokenService;