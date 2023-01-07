import axios from "axios";
import { logoutHandler } from "../controllers/auth-controller";

const API_URL = 'http://localhost:3000';

export const axiosLogout = () => {
    localStorage.removeItem("user");
}

export const axiosSignUp = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        username,
        password,
        email
    });
};

export const axiosLogin = async (username: string, password: string) => {
    const response = await axios
    .post(API_URL + "login", {
        username,
        password
    });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
}