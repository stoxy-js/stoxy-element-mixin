import { write, sub } from '@stoxy/core';
import { StoxyElement } from '@stoxy/element-mixin';

const template = document.createElement('template');
template.innerHTML = ` 
            <form>
                <input type="text" name="username" />
                <input type="submit" value="Update username" />
            </form>
`;

class UsernameField extends StoxyElement(HTMLElement) {
    static get stoxyProperties() {
        return {
            key: 'example-data',
            state: { username: 'World' },
        }
    };

    stoxyUpdated() {
        this.updateContent();
    }

    constructor() {
        super();
        this.username = '';

        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));

        /** @type {HTMLInputElement} */
        this.usernameField = root.querySelector("input[name='username']");
    }

    connectedCallback() {
        this.shadowRoot.querySelector('form').addEventListener('submit', this.onSubmit.bind(this));
        this.updateContent();
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        write('example-data.username', formData.get('username'));
    }

    updateContent() {
        this.usernameField.value = this.username;
    }
}

customElements.define('username-field', UsernameField);
