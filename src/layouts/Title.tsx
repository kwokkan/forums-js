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
            <link key="rsuite-css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rsuite@4.8.0/dist/styles/rsuite-default.min.css" integrity="sha256-iJOcspl2lqiHR4OrS1jeweVu820CH4rB1hjPnK0OOxA=" crossOrigin="anonymous" />
        </Head>
    );
}
