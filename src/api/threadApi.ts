import { IMessage } from "../types/IMessage";
import { IThread } from "../types/IThread";

interface IAddThreadModel {
    forumId: number;
    title: string;
    message: string;
}

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

export async function addThread({ forumId, title, message }: IAddThreadModel): Promise<IThread> {
    const response = await fetch("/api/forums/" + forumId, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ forumId, title, message })
    });

    if (!response.ok) {
        throw new Error("Failed to add thread: " + response.statusText);
    }

    return response.json();
}
