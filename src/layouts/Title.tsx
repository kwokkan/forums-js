import Head from "next/head";

interface IProps {
    title?: string;
}

export function Title(props: IProps) {
    let title = "Forums JS";

    if (props.title) {
        title = `${props.title} - ${title}`;
    }

    return (
        <Head>
            <title>{title}</title>
            <link key="favicon" rel="icon" type="image/png" href="/logo.png" />
        </Head>
    );
}
