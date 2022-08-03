import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { addLog } from "../../../services/logService";
import { getOrCreateAuthUser } from "../../../services/userService";
import { authConfig } from "../../../utils/config";

const options: NextAuthOptions = {
    debug: true,
    providers: [
        GitHubProvider({
            clientId: authConfig.github.id!,
            clientSecret: authConfig.github.secret!,
            authorization: {
                params: {
                    scope: ""
                }
            }
        }),
    ],
    events: {
        session: async (message) => {
            await addLog("[events:session]", message);
        },
        signIn: async (message) => {
            await addLog("[events:signIn]", message);
        },
        signOut: async (message) => {
            await addLog("[events:signOut]", message);
        }
    },
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            await addLog("[callbacks:signIn]", user, account, profile);

            return true;
        },
        redirect: async ({ url, baseUrl }) => {
            await addLog("[callbacks:redirect]", url, baseUrl);

            return url;
        },
        jwt: async ({ token, user, account, profile, isNewUser }) => {
            await addLog("[callbacks:jwt]", token, user, account, profile, isNewUser);

            if (account) {
                await addLog("[callbacks:jwt]", "Creating session");
                const authUser = await getOrCreateAuthUser(account.provider, account.providerAccountId, user!.name!);

                token.forumsUser = authUser;

                await addLog("[callbacks:jwt]", "Created session", token);
            }

            return token;
        },
        session: async ({ session, user, token }) => {
            await addLog("[callbacks:session]", session, user, token);

            session.forumsUser = token.forumsUser;

            return session;
        }
    }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options); 

export default handler;
