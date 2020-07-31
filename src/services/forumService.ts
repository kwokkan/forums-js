import { mockForums } from "../mocks/mockForums";
import { IForum } from "../types/IForum";

export function getForumById(id?: number): Promise<IForum | undefined> {
	const forum = mockForums.find(x => x.id == id);

	return Promise.resolve(forum);
}

export function getForums(): Promise<IForum[]> {
	const forums = mockForums;

	return Promise.resolve(forums);
}
