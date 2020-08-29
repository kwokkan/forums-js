import { parseIntParam } from "./paramUtil";

const env = process.env;

const dbConfig = {
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    ssl: env.DB_SSL === "true"
};

const authConfig = {
    github: {
        id: env.AUTH_GITHUB_ID,
        secret: env.AUTH_GITHUB_SECRET
    }
};

const logConfig = {
    level: parseIntParam(env.LOG_LEVEL) ?? 0,
    throwOnError: env.LOG_THROW_ON_ERROR === "true"
};

export { authConfig, dbConfig, logConfig };
