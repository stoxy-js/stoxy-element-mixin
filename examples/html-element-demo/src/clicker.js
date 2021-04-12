import { update } from '@stoxy/core';
import { StoxyElement } from '@stoxy/element-mixin';

const template = document.createElement('template');
template.innerHTML = `
    <button>Click me!</button>
    <p>I am also keeping count <span id="counter"></span></p>
`;

/**
 * @class
 * @constructor
 *
 * @property {HTMLSpanElement} clicksCounter
 *
 * */
class Clicker extends StoxyElement(HTMLElement) {
    static get stoxyProperties() {
        return {
            key: 'example-data',
            state: { clicks: 0, foo: "bar" },
            init: true
        }
    };

    stoxyUpdated(_updatedProperties) {
        console.log('State updated!', _updatedProperties);
        this.updateContent();
    }

    constructor() {
        super();
        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));
        this.clicks = 0;

        root.querySelector('button').addEventListener('click', this.inc.bind(this));
        /** @type {HTMLButtonElement} */
        this.clicksCounter = root.querySelector('#counter');
    }

    connectedCallback() {
        this.updateContent();
    }

    inc() {
        update('example-data.clicks', clicks => (clicks += 1));
    }

    updateContent() {
        this.clicksCounter.innerText = this.clicks.toString();
    }
}

customElements.define('clicker-element', Clicker);
