import { IncomingMessage, ServerResponse } from "http";
import NextAuth, { IProviderOptions } from "next-auth";
import Providers from "next-auth/providers";
import { getOrCreateAuthUser } from "../../../services/userService";
import { authConfig } from "../../../utils/config";
import { logDebug, logError } from "../../../utils/logging";

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
        error: (message) => {
            logError(message);
        }
    },
    pages: {
        signIn:"/auth/signin"
    },
    callbacks: {
        //signIn: (user, account, profile) => {
        //    console.debug("[callbacks:signIn]", user, account, profile);

        //    return Promise.resolve(true);
        //},
        //redirect: (url, baseUrl) => {
        //    console.debug("[callbacks:redirect]", url, baseUrl);

        //    return Promise.resolve(url);
        //},
        jwt: async (token, user, account, profile, isNewUser) => {
            logDebug("[callbacks:jwt]", token, user, account, profile, isNewUser);

            if (account) {
                logDebug("[callbacks:jwt]", "Creating session");
                const authUser = await getOrCreateAuthUser(account.provider, account.id, user.name);

                token.forumsUser = authUser;

                logDebug("[callbacks:jwt]", "Created session", token);
            }

            return token;
        },
        session: (session, user, sessionToken) => {
            logDebug("[callbacks:session]", session, user, sessionToken);

            session.forumsUser = user.forumsUser;

            return Promise.resolve(session);
        }
    }
};

const handler = (req: IncomingMessage, res: ServerResponse) => NextAuth(req, res, options); 

export default handler;
