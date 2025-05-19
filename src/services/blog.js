import { getToken } from "./token"

export const createBlog = async (formData) => {
    const url = "http://localhost:3000/api/posts";
    const token = getToken();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error(`Failed to create blog: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.error("Error creating blog:", err);
        throw err;
    }
}