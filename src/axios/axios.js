import axios from "axios";
export const baseUrl = 'http://127.0.0.1:8000/api/v1/client/';
// export const baseUrl = 'https://rzautos-backend.mohammedsifankp.online/api/v1/client/';


const api = axios.create({
    baseURL: baseUrl,
    timeout: 8000,
    headers: {
        "Content-Type" : "application/json",
    }
});

// Request middleware
api.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


// Responce middleware

api.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        // location.assign("/error")
        console.error("Error in response:", error);
        return Promise.reject(error)
    }
)

export {api};