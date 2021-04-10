![Stoxy Logo](assets/stoxy.png)

![](https://badgen.net/npm/v/@stoxy/element-mixin)
![](https://badgen.net/bundlephobia/dependency-count/@stoxy/element-mixin)
![](https://badgen.net/bundlephobia/minzip/@stoxy/element-mixin)

# 🗂️ Stoxy Element Mixin

Stoxy is a state management API equipped with Web Components.

Stoxy allows you to easily handle, persist and update data in your DOM without the weight of a framework.

This is the repository of the [mixin](https://javascript.info/mixins) to enable creating reactive Web Components with Stoxy

# 📖 Official docs

Official docs can be found [here](https://stoxy.dev)

## 🧰 Installation

Install [Stoxy](https://github.com/Matsuuu/stoxy) into your dependencies

```sh
npm install @stoxy/core
```

Then install this library to enable the mixin support

```sh
npm install @stoxy/element-mixin
```

## Usage

Utilizing the Stoxy Element Mixin has a few steps:

1. Add the mixin to your WebComponent

```javascript
import { StoxyElement } from "@stoxy/element-mixin";

class MyComponent extends StoxyElement(HTMLElement) {}
```

2. Initialize the initial state

```javascript
import { StoxyElement } from "@stoxy/element-mixin";

class MyComponent extends StoxyElement(HTMLElement) {
  static stoxyProperties = {
    // Stoxy state object key to listen to
    key: "example-data",
    // Initial state values. Only the properties listed here will be observed
    state: {
      username: "World",
      clicks: 0,
      description: "This is a example of Stoxy Element Mixin",
    },
    // `init: true` if you want to update the current state with the data above
    //
    // Setting init at true will do a write to said key when the object is initialized
    // Init can be omitted on properties where writing to state on initialization is not wanted
    init: true,
  };
}
```

3. React to updates

```javascript
import { StoxyElement } from "@stoxy/element-mixin";

class MyComponent extends StoxyElement(HTMLElement) {
  static stoxyProperties = {
    key: "example-data",
    state: {
      username: "World",
      clicks: 0,
      description: "This is a example of Stoxy Element Mixin",
    },
    init: true,
  };

  stoxyUpdated(_changedProperties) {
    this.updateComponent();
  }

  updateComponent() {
    // Do UI updates
  }
}
```

After the setup, every time you update the state from anywhere in your application with the [commands
from @stoxy/core](https://stoxy.dev/docs/methods/add/), the state properties will be updated on your
class too.

### Using with LitElement

Stoxy Element Mixin ships with direct support to some web component libraries.

The current tested ones is mainly LitElement.

A setup with LitElement would look like the following:

```javascript
import { StoxyElement } from "@stoxy/element-mixin";
import { LitElement, html } from "lit-element";

class MyComponent extends StoxyElement(LitElement) {
  static stoxyProperties = {
    key: "example-data",
    state: {
      username: "World",
      clicks: 0,
      description: "This is a example of Stoxy Element Mixin",
    },
    init: true,
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

    this.username = "";
    this.clicks = 0;
    this.description = "";
  }

  render() {
    return html`
      <h2>Hello, ${this.username}!</h2>
      <p>You have clicked the clicker ${this.clicks} times</p>
      <p>${this.description}</p>
    `;
  }
}
```

Since the property change reactions are handled by litelement, implementing the
`stoxyUpdated` method is not necessary.
