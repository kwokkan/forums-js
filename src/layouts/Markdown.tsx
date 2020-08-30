import ReactMarkdown from "react-markdown";

interface IProps {
    content: string;
}

export function Markdown(props: IProps) {
    return (
        <ReactMarkdown source={props.content} />
    );
}
