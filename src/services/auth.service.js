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
        //const token = TokenService.getLocalRefreshToken();
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZ3JvdXBlMi5sZWFybi1pdC5vdmgvYXBpL2FjY291bnRzL3NpZ24taW4iLCJpYXQiOjE2OTUzMDczMzAsImV4cCI6MTY5NTMyNTMzMCwibmJmIjoxNjk1MzA3MzMwLCJqdGkiOiJwQjRNSldkRHVpalh6ektFIiwic3ViIjoiYWNjb3VudC0wMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDIiLCJwcnYiOiJjOGVlMWZjODllNzc1ZWM0YzczODY2N2U1YmUxN2E1OTBiNmQ0MGZjIiwicHJvZmlsZSI6ImV5SnBkaUk2SW5wMllXOUpZVGRQYlhOemFUSlVlRGxuV0RaMVRuYzlQU0lzSW5aaGJIVmxJam9pV1ZsNWFWZEViRU56U1dsUFIzQlZWVlpVWW5NNWNUY3dSazl0UW5rNVVVSmFXalkxTVhCYUswSk1ZVzV3YlVoUFdtTjVUeXRCUkhOSVMxUnJabGMzYlM5SVpucFpZMkowVjBaVWNtOHlOQzlhVUdJMllqWnBNazFoZG5oVldrcElWMVZtWjNSNFYwNHZkRkZYYUhWaFJETk9OMVZpTTJ0WU5YQnFiVGRGYUVjdlZteElWa2hpTkZoc2JHdE5PVmgwYlhReWNuZGpLM0ExVTJWQmREVTBVa1JEV2s0M2FGRnNXbTFKY1VkUlEyeHZhbGRpVVdJNWVsTmpSVmhpY2xGNWQxcHhWMjVJVkRsVFEydEdaVUZOV1dSblpYZHJlWHBFVlhZdmNVdGhXRVExTkVwWk1tdFRlV1ZUU0hKbVlVaFpNVVIyWlVKYVJHWlFkMVZhYTA1c1YyMU5OSFpqUzBoQ1JVUnhTR2hLY3pKeFZVZGpjblpVVVdWbVpHcHRTRWt4YmpkcFRtdGxjVnBRTUN0aFEzcERlbWR4YmtaU2NYY3ZObFJJVUhwNFNWUTVRUzlPYjB4RFQzVjZTV3NyYjNsRGNFOU1aaXRWY0RremJsYzJRVmhEYUVWU1ExcHdXQ3M0VVM4M1dFbG5la05MV1VJeU1YaFRNSGRZT1djMGNVbHpUMDlNUTNwSWRuSXhhWHBvUW1OdlZYQkVZVE5MYUdoRGRXOXNkSFZqUkZWRVJHcFVhamxOWVZSbllVNXRiVnAyVHk5MGRHOVZZelZNWlVKRlVteG1jV3RPUVVodE0yaHZSRzVJYWt3clZUSklWV3QxZFZoS2JVRlNlamRqTTBoUVZXVmpXbGhFWmtKNFJqTTFZbkV3TWxnNVVWQnBiV2RMVVd0Rk1HTm5XRUY1YVVwdFNsVkxNMEpCTkVKSE5HZEJNSGxIUmpsa1JWZ3ZlWGxOUlZWb2MwcFhMMFZxUmxaUFVISkxNMHczWjJKSlZYRmtjVU4xWm00MFJWZHZRVmRKYkdOaU9HZEdNRVJtUW1VNFpHdFVOMk4wTTJRNVNGaGlORWRUTjFadmVpdEJkSHA0VGtNeVNtbE1helpVWXpsaVozY3dWMFV2YjBWMEwwMVpOa3RGVURreWNrUlNUVEZLY25FMGQzVmhkR1ozUXpocmRVMWFTVkpDYW0xbVMxTjZNMmhqYURaWFprVnVURm8xUm5KSU16RTVWREUzTWtoSFVHcFlLMFZ5YWpGWVJISnpjSGhFV213NFZrVmpObWhGTHpOc1JqZHplVTB6UnpSSVowRTRUbTVzTTJac1JWbENaWEY0V0hWNEsxZFplRGM0U3pSUFFrZFdOVlUzWjFGRlkxQkZRa3BFWW1aVWJ6azFhbFpZV0VwNWRFTkNMemh0Y2xObGNtaG1UVGs1WVVGQ1pXSmlTbUZFTUZFeldIbENXVE40VDNNNGJEVkNORGxaV0RoMWEyTnFNRGQ0V1V0Qk56Wk5TWGcyUjJaT1ZWSlFZV1J2WkRaWVNDOW1WazFuVEVaSlpHNXlUbkE0Y0dzOUlpd2liV0ZqSWpvaVlqTXpZVEV4TnpFeU1XWTROVFE0TjJZMU5EaGpZVFF5TmpRME4yWXlaVEptTjJZeU5tSTJOMlpoWkRjNE5tRmpOVEU1TUdFd01XTmlPRGt6Tmpjek5TSXNJblJoWnlJNklpSjkifQ.ZwXdqFQdUyNn6fgzWmAUKNaCB6MptatfpRqAW8ZBjUg";
        return await api.post(
            process.env.REACT_APP_URL + "/api/accounts/refresh-token",
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }
        )
    }
}

export default AuthService;