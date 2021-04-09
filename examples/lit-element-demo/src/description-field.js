import { read, write, sub } from '@stoxy/core';
import { html, LitElement } from 'lit-element';

class DescriptionField extends LitElement {
    static get properties() {
        return {
            description: { type: String },
        };
    }

    constructor() {
        super();
        this.description = '';
    }

    firstUpdated() {
        sub('example-data', event => (this.description = event.data.description));
    }

    onKeyUp(e) {
        write('example-data.description', e.target.value);
    }

    render() {
        return html` <textarea cols="40" rows="8" @keyup=${this.onKeyUp}>${this.description}</textarea> `;
    }
}

customElements.define('description-field', DescriptionField);
