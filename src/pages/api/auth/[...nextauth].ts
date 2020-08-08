import { IncomingMessage, ServerResponse } from "http";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),
    ]
};

const handler = (req: IncomingMessage, res: ServerResponse) => NextAuth(req, res, options); 

export default handler;
