export const getUsers = async () => {
    const url = `http://localhost:3000/api/allUsers`;

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}