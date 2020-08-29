import React from "react";
import { findDOMNode } from "react-dom";
import { renderIntoDocument } from 'react-dom/test-utils';

class TestWrapper extends React.Component {
    render() {
        return this.props.children;
    }
}

export function getInstance(children: React.ReactElement<any, any>): JSX.Element {
    // isReactComponent is only defined if children is of React.Component class
    // so we can test against this to verify this is a functional component
    if (!(children.type.prototype && children.type.prototype.isReactComponent)) {
        const instanceRef = React.createRef();

        const Forwarded = React.forwardRef((props, ref) => React.cloneElement(children, { props: props, ref: ref }));

         renderIntoDocument(
            <TestWrapper><Forwarded  /></TestWrapper>
        ) as unknown as React.ReactElement;

        return instanceRef.current as unknown as React.ReactElement;
    }

    return renderIntoDocument(children) as unknown as React.ReactElement;
}

export function getDOMNode(children: React.ReactElement<any, any>): JSX.Element {
    return findDOMNode(getInstance(children) as unknown as React.Component) as unknown as JSX.Element;
}
