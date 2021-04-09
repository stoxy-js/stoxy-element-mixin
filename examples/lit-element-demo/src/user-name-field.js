import { write, sub } from '@stoxy/core';
import { html, LitElement } from 'lit-element';

class UsernameField extends LitElement {

    static get properties() {
        return {
            username: { type: String }
        };
    }

    constructor() {
        super();
        this.username = "";
    }

    firstUpdated() {
        sub("example-data", (event) => this.username = event.data.username)
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        write("example-data.username", formData.get("username"));
    }

    render() {
        return html`
            <form @submit=${this.onSubmit}>
                <input type="text" name="username" value=${this.username} />
                <input type="submit" value="Update username" />
            </form>
        `;
    }
}

customElements.define('username-field', UsernameField);
