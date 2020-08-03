import { IForum } from "../types/IForum";
import * as repo from "./../repositories";

export async function getForumById(id?: number): Promise<IForum | undefined> {
	if (id === undefined) {
		return;
	}

	const forum = await repo.getForumById(id);

	return forum;
}

export async function getForums(): Promise<IForum[]> {
	const forums = await repo.getForums();

	return forums;
}
