import { getToken } from "./token";

export const postComment = async (blogId, formData) => {
    const url = `http://localhost:3000/api/posts/${blogId}/comments`;
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
            throw new Error(`Failed to post comment: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.comment;
    } catch (err) {
        console.error("Error posting comment:", err);
        throw err;
    }
}

export const deleteComment = async (commentId) => {
    const url = `http://localhost:3000/api/posts/${commentId}/delete`;
    const token = getToken();

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to delete blog: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.error("Error deleting comment:", err);
        throw err;
    }
}