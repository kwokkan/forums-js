import { IncomingMessage, ServerResponse } from "http";
import NextAuth, { IProviderOptions } from "next-auth";
import Providers from "next-auth/providers";
import { addLog } from "../../../services/logService";
import { getOrCreateAuthUser } from "../../../services/userService";
import { authConfig } from "../../../utils/config";

const options: IProviderOptions = {
    debug: true,
    providers: [
        Providers.GitHub({
            clientId: authConfig.github.id!,
            clientSecret: authConfig.github.secret,
            scope: []
        }),
    ],
    events: {
        error: async (message) => {
            await addLog("[events:error]", message);
        }
    },
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        signIn: async (user, account, profile) => {
            await addLog("[callbacks:signIn]", user, account, profile);

            return true;
        },
        redirect: async (url, baseUrl) => {
            await addLog("[callbacks:redirect]", url, baseUrl);

            return url;
        },
        jwt: async (token, user, account, profile, isNewUser) => {
            await addLog("[callbacks:jwt]", token, user, account, profile, isNewUser);

            if (account) {
                await addLog("[callbacks:jwt]", "Creating session");
                const authUser = await getOrCreateAuthUser(account.provider, account.id, user.name);

                token.forumsUser = authUser;

                await addLog("[callbacks:jwt]", "Created session", token);
            }

            return token;
        },
        session: async (session, user, sessionToken) => {
            await addLog("[callbacks:session]", session, user, sessionToken);

            session.forumsUser = user.forumsUser;

            return session;
        }
    }
};

const handler = (req: IncomingMessage, res: ServerResponse) => NextAuth(req, res, options); 

export default handler;
