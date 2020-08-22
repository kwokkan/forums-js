import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { addMessage } from "../../../services/threadService";
import { logDebug } from "../../../utils/logging";
import { parseIntParam } from "../../../utils/paramUtil";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    logDebug("api/threads/[id]", req, res);

    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).end();
    }

    const id = parseIntParam(req.query?.id as string);
    const created = await addMessage(id, session.forumsUser!.id, req.body.message);

    return res.status(201).json(created);
}
