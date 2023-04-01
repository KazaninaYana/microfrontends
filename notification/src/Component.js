import React from 'react';
import ReactDOM from 'react-dom';

function Component(props) {
    return (
        <div>
            <div>
                <span>Name:</span>

                <span>{props.name ? ` ${props.name}` : 'Нет имени'}</span>
            </div>
            <div>
                <span>Value:</span>

                <span>{props.value ? ` ${props.value}` : 'Нет значения'}</span>
            </div>
        </div>
    );
}
//Регистрация кастомного компонента
class CustomElementClassName extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name');
        const value = this.getAttribute('value');
        ReactDOM.render(
            <Component name={name} value={value}/>,
            this
        );
    }
}
if (!customElements.get('component-custom-element'))
    customElements.define('component-custom-element', CustomElementClassName);
