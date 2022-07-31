import { useState } from "react";
import { Button, Content, Form, Input, Panel, PanelGroup } from "rsuite";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

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
                        <Form.Group controlId="title">
                            <Form.ControlLabel>Title</Form.ControlLabel>
                            <Form.Control name="title" value={title} onChange={setTitle} />
                        </Form.Group>

                        <Form.Group controlId="message">
                            <Form.ControlLabel>Message</Form.ControlLabel>
                            <Form.Control rows={10} name="message" accepter={Textarea} className="mb-3" value={message} onChange={setMessage} />
                        </Form.Group>
                    </Form>
                </Content>
            </PanelGroup>

            <Button appearance="primary" onClick={onNewThread}>Submit</Button>
        </Panel>
    );
}
