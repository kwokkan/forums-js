import { IMessage } from "../types/IMessage";

export async function addMessage(id: number, message: string): Promise<IMessage> {
    const response = await fetch("/api/threads/" + id, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ message })
    });

    if (!response.ok) {
        throw new Error("Failed to add message: " + response.statusText);
    }

    return response.json();
}
