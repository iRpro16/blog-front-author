import { setToken, removeToken } from "./token";

export const signup = async (info) => {
    const url = "http://localhost:3000/signup";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        });
        console.log(response);
    } catch (err) {
        console.error(err.message);
    }
}

export const login  = async (credentials) => {
    const url = "http://localhost:3000/login";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login Failed");
        }

        const data = await response.json();
        setToken(data.token);
    } catch (err) {
        console.error(err.message);
    }
}

export const logout  = () => {
    removeToken();
}