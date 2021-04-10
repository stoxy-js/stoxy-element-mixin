import { read, write, sub } from '@stoxy/core';
import { StoxyElement } from "@stoxy/element-mixin";

const template = document.createElement("template");
template.innerHTML = `
     <textarea cols="40" rows="8"></textarea> 
`;

class DescriptionField extends StoxyElement(HTMLElement) {

    static get stoxyProperties() {
        return {
            key: "example-data",
            state: { "description": "This value is updated on keydown from the textarea. Try it out by typing into this field." },
        }
    }

    stoxyUpdated(_changedProperties) {
        this.updateContent();
    }

    constructor() {
        super();
        this.description = '';
        const root = this.attachShadow({ mode: "open" })
        root.appendChild(template.content.cloneNode(true));

        this.textarea = root.querySelector("textarea");
    }

    connectedCallback() {
        this.textarea.addEventListener("keyup", this.onKeyUp.bind(this));

        sub('example-data', event => (this.description = event.data.description));
    }

    onKeyUp(e) {
        write('example-data.description', e.target.value);
    }

    updateContent() {
        this.textarea.value = this.description;
    }
}

customElements.define('description-field', DescriptionField);
