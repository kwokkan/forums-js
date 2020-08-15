import { IncomingMessage, ServerResponse } from "http";
import NextAuth, { IProviderOptions } from "next-auth";
import Providers from "next-auth/providers";
import { getOrCreateAuthUser } from "../../../services/userService";

const options: IProviderOptions = {
    providers: [
        Providers.GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            scope: []
        }),
    ],
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
            //console.debug("[callbacks:jwt]", token, user, account, profile, isNewUser);

            if (account) {
                //console.debug("[callbacks:jwt]", "Creating session");
                const authUser = await getOrCreateAuthUser(account.provider, account.id, user.name);

                token.forumsUser = authUser;

                //console.debug("[callbacks:jwt]", "Created session", token);
            }

            return token;
        },
        session: (session, user, sessionToken) => {
            //console.debug("[callbacks:session]", session, user, sessionToken);
            session.forumsUser = user.forumsUser;

            return Promise.resolve(session);
        }
    }
};

const handler = (req: IncomingMessage, res: ServerResponse) => NextAuth(req, res, options); 

export default handler;
