
export async function jsonPost(url: string, body: {}): Promise<Response> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    });

    if (!response) {
        response = {};
    }

    return response;
}
