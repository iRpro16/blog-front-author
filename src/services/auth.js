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
        const data = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        setToken(data.token); // set token

    } catch (err) {
        console.error(err.message);
    }
}

export const logout  = () => {
    removeToken();
}