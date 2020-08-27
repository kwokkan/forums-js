import { useState } from "react";
import { Button, Content, ControlLabel, Form, FormControl, FormGroup, Panel, PanelGroup } from "rsuite";

interface IProps {
    onNewThread?: (title: string, message: string) => Promise<void>;
}

export function NewThread(props: IProps) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const onNewThread = async () => {
        await props.onNewThread?.(title, message);

        setTitle("");
        setMessage("");
    };

    return (
        <Panel header={<h3>New thread</h3>}>
            <PanelGroup>
                <Content>
                    <Form fluid>
                        <FormGroup controlId="title">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl name="title" value={title} onChange={setTitle} />
                        </FormGroup>

                        <FormGroup controlId="message">
                            <ControlLabel>Message</ControlLabel>
                            <FormControl rows={10} name="message" componentClass="textarea" className="mb-3" value={message} onChange={setMessage} />
                        </FormGroup>
                    </Form>
                </Content>
            </PanelGroup>

            <Button appearance="primary" onClick={onNewThread}>Submit</Button>
        </Panel>
    );
}
