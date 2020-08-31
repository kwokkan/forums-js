import { useState } from "react";
import { Input, Nav } from "rsuite";
import { Markdown } from "./Markdown";

interface IProps {
    content: string;
    name?: string;
    rows?: number;
    className?: string;
    placeholder?: string;
    onChange?: (content: string) => void;
}

function renderText(mode: number, props: IProps): React.ReactElement | null {
    if (mode !== 1) {
        return null;
    }

    return (
        <Input
            rows={props.rows}
            name={props.name}
            componentClass="textarea"
            style={{ resize: "both" }}
            value={props.content}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    );
}

function renderPreview(mode: number, props: IProps): React.ReactElement | null {
    if (mode !== 2) {
        return null;
    }

    return (
        <div className="markdown-preview">
            <Markdown content={props.content} />
        </div>
    );
}

export function MarkdownPreview(props: IProps) {
    const [mode, setMode] = useState(1);

    return (
        <div className={props.className}>
            <Nav activeKey={mode} appearance="subtle" onSelect={setMode}>
                <Nav.Item eventKey={1} className="preview-strip-1">
                    Text
                </Nav.Item>
                <Nav.Item eventKey={2} className="preview-strip-2">
                    Preview
                </Nav.Item>
            </Nav>

            {renderText(mode, props)}

            {renderPreview(mode, props)}
        </div>
    );
}
