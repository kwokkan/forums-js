import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

export type GetTypedServerSideProps<TParams extends ParsedUrlQuery, TProps = { [key: string]: any }> = GetServerSideProps<TProps, TParams>;
