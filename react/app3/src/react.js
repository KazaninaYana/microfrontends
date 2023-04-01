import React, { Suspense } from 'react';
import { render } from 'react-dom';

const MyFirstReactComponent = React.lazy(() => import('./app1/App'));


class ReactLoader extends React.Component {
    load(componentName, args, container, callback) {

        const Component = React.createElement(eval(componentName), args, null);

        render(<Suspense fallback="Component Failed to Load">{Component}</Suspense>, container, callback);
    }

    render() {
        return React.createElement("span", { style: { display: "none" } }, "React Loader", this.props.name);
    }
}

render(<ReactLoader ref={(element) => { window.Loader = element;}}/>, document.getElementById('app'));

const firstContainer = document.createElement("div");
firstContainer.id = "divFirstContainer";
document.getElementsByTagName('body')[0].appendChild(firstContainer);

window.Loader.load("MyFirstReactComponent", null, firstContainer, function() {
    console.log("First Component Loaded");
});
