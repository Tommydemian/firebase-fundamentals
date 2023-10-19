import { AuthInfo } from "../types";

export const useGetUserInfo = () => {
    const rawAuthData = localStorage.getItem('auth');
    // if there's data => JSON.parse(data) else return null
    const authObject: AuthInfo | null = rawAuthData ? JSON.parse(rawAuthData) : null;
    
    return { authObject };
};

