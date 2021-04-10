import { StoxyElement } from '@stoxy/element-mixin';

const template = document.createElement("template");
template.innerHTML = `
    <h2>Hello, <span id="username"></span>!</h2>
    <p>You have clicked the clicker <span id="clicker"></span> times</p>
    <p id="description"></p>
`;

export default class HTMLElementDemo extends StoxyElement(HTMLElement) {
    static stoxyProperties = {
        key: 'example-data',
        state: {
            username: 'World',
            clicks: 0,
            description: 'This value is updated on in realtime by the textarea',
        },
        init: true
    };

    stoxyUpdated() {
        this.updateContent();
    }

    constructor() {
        super();

        const root = this.attachShadow({ mode: "open" })
        root.appendChild(template.content.cloneNode(true));

        /** @type { HTMLSpanElement } **/
        this.usernameField = root.querySelector("#username");
        /** @type { HTMLSpanElement } **/
        this.clickerField = root.querySelector("#clicker");
        /** @type { HTMLSpanElement } **/
        this.descriptionText = root.querySelector("#description");

        this.username = '';
        this.clicks = 0;
        this.description = '';
    }

    connectedCallback() {
        this.updateContent();
    }

    updateContent() {
        this.usernameField.innerText = this.username;
        this.clickerField.innerText = this.clicks.toString();
        this.descriptionText.innerText = this.description;
    }
}

if (!customElements.get('html-element-demo')) {
    customElements.define('html-element-demo', HTMLElementDemo);
}
