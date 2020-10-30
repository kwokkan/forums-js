
export async function jsonPost(url: string, body: {}, url: number): Promise<Response> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    });

    return response;
}
