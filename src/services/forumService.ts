import { IForum } from "../types/IForum";
import * as repo from "./../repositories";

export async function getForumById(id?: number): Promise<IForum | undefined> {
	if (id === undefined) {
		return;
	}

	const forum = await repo.getForumById(id);

	if (forum) {
		const threads = await repo.getThreadsByForumId(id);
		forum.threads = threads;
	}

	return forum;
}

export async function getForums(): Promise<IForum[]> {
	const forums = await repo.getForums();

	return forums;
}
