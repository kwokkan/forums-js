import * as repo from "./../repositories";

export async function addLog(...args: any[]): Promise<void> {
    const message = JSON.stringify({ ...args });
    await repo.addLog(message);
}
