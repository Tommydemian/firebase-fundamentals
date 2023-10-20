import { AuthInfo } from "../types";

export const useGetUserInfo = () => {
    const rawAuthData = localStorage.getItem('auth');
    // if there's data => JSON.parse(data) else return null
    let authObject: AuthInfo | null = null;
    try {
        authObject = rawAuthData ? JSON.parse(rawAuthData) : null;
    } catch (error) {
        console.error("Error parsing auth data from localStorage:", error);
        // Manage error, i.e clean not valid data from localStorage
    }
    return { authObject };
};

