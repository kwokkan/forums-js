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

const enum Mode {
    editor = "editor",
    preview = "preview",
}

function renderText(mode: Mode, props: IProps): React.ReactElement | null {
    if (mode !== Mode.editor) {
        return null;
    }

    function handleOnChange(value: string | number | ReadonlyArray<string>, _: React.SyntheticEvent): void {
        if (props.onChange) {
            props.onChange(value as string);
        }
    }

    return (
        <Input
            rows={props.rows}
            name={props.name}
            as="textarea"
            style={{ resize: "both" }}
            value={props.content}
            placeholder={props.placeholder}
            onChange={handleOnChange}
        />
    );
}

function renderPreview(mode: Mode, props: IProps): React.ReactElement | null {
    if (mode !== Mode.preview) {
        return null;
    }

    return (
        <div className="markdown-preview">
            <Markdown content={props.content} />
        </div>
    );
}

export function MarkdownPreview(props: IProps) {
    const [mode, setMode] = useState(Mode.editor);

    return (
        <div className={props.className}>
            <Nav activeKey={mode} appearance="subtle" onSelect={setMode}>
                <Nav.Item eventKey={Mode.editor} className="preview-strip-1">
                    Text
                </Nav.Item>
                <Nav.Item eventKey={Mode.preview} className="preview-strip-2">
                    Preview
                </Nav.Item>
            </Nav>

            {renderText(mode, props)}

            {renderPreview(mode, props)}
        </div>
    );
}
