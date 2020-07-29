import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

export type GetTypedServerSideProps<TParams extends ParsedUrlQuery> = GetServerSideProps<{ [key: string]: any }, TParams>;
