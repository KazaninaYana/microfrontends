class CustomElement extends HTMLElement {
    /*массив имён атрибутов для отслеживания их изменений*/
    static get observedAttributes() {
        return ['special-program'];
    }

    // вызывается при изменении одного из перечисленных выше атрибутов
    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue !== newValue) {
            let customEvent = new CustomEvent('change-' + name, {bubbles: true});
            customEvent.value = newValue;
            this.dispatchEvent(customEvent)
        }
        this.querySelectorAll('option').forEach(element => {
            if(element.getAttribute('value') === newValue) {
                element.setAttribute('selected', "");
            }
            else {
                element.removeAttribute('selected');
            }
        });
    }
    // браузер вызывает этот метод при добавлении элемента в документ
    connectedCallback() {
        this.addEventListener('click', () => {
            console.log('click');
             const newProgram = this.getAttribute('special-program') === "regular" ? "" : "regular";
            this.setAttribute('special-program', newProgram);
        });
        const program = this.getAttribute('special-program')
        this.innerHTML =
            `<select>
                <option value="regular" ${program === 'regular' ? "selected" : ""}>Стандарт</option>
                <option value="family-program" ${program === 'regular' ? "" : "selected"}>Семейный</option>
            </select>`
    }

    /*
    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    adoptedCallback() {
        // вызывается, когда элемент перемещается в новый документ
        // (происходит в document.adoptNode, используется очень редко)
    }
    */
}

if (!customElements.get('component-with-event'))
    customElements.define('component-with-event', CustomElement);
