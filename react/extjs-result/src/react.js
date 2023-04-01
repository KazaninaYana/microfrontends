import React from 'react';
import { render } from 'react-dom';

export default class ReactLoader extends React.Component {
    load(module, container, args, callback) {
        this.setState({
            module
        });
        render(
            <div><module.default/></div>,
            container,
            callback
        );
    }
    render() {
        return null;
    }
}

render(
    <ReactLoader ref={(element) => { window.Loader = element;}}/>,
    document.getElementById('micro-frontend-root')
);
