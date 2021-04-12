import { html, LitElement } from 'lit-element';
import { update } from '@stoxy/core';
import { StoxyElement } from '@stoxy/element-mixin';

class Clicker extends StoxyElement(LitElement) {

    static get stoxyProperties() {
        return {
            key: 'example-data',
            state: { clicks: 0, foo: "bar" },
            init: true
        }
    };

    static get properties() {
        return { clicks: { type: Number } };
    }

    stoxyUpdated(_updatedProperties) {
        console.log("State updated!", _updatedProperties)
    }

    constructor() {
        super();
        this.clicks = 0;
    }

    inc() {
        update('example-data.clicks', clicks => (clicks += 1));
    }

    render() {
        return html`<button @click=${this.inc}>Click me!</button>
            <p>I am also keeping count ${this.clicks}</p>`;
    }
}

customElements.define('clicker-element', Clicker);
