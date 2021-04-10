import { LitElement, html } from 'lit-element';
import { StoxyElement } from '@stoxy/element-mixin';

export default class LitElementDemo extends StoxyElement(LitElement) {
    static get stoxyProperties() {
        return {
            key: 'example-data',
            state: {
                username: 'World',
                clicks: 0,
                description: 'This value is updated on in realtime by the textarea',
            },
            init: true
        }
    };

    static get properties() {
        return {
            username: { type: String },
            clicks: { type: Number },
            description: { type: String },
        };
    }

    constructor() {
        super();

        this.username = '';
        this.clicks = 0;
        this.description = '';
    }

    render() {
        return html`
            <h2>Hello, ${this.username}!</h2>
            <p>You have clicked the clicker ${this.clicks} times</p>
            <p>${this.description}</p>
        `;
    }
}

if (!customElements.get('lit-element-demo')) {
    customElements.define('lit-element-demo', LitElementDemo);
}
