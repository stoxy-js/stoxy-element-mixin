import { sub, write } from "@stoxy/core";

/**
 * @param {typeof HTMLElement} superclass
 */
export function StoxyElement(superclass) {
    return class StoxyLitMixin extends superclass {
        constructor() {
            super();
            const properties = this.constructor.stoxyProperties;
            if (!properties) {
                throw Error(`StoxyElement required a static property stoxyProperties to be set

                Example implementation:

                static stoxyProperties = {
                    key: "stoxy-state-object",
                    initialState: { foo: "bar" }
                }

            `);
            }

            this.__propertiesInUse = []; // Initialized on first update
            this.__stoxyKey = properties.key;
            this.__initialStoxyState = properties.initialState;

            sub(this.__stoxyKey, this._updateProperties.bind(this));

            // If init flag is set to false, skip setting initial state properties
            if (typeof properties.init != "undefined" && properties.init == false) {
                return;
            }

            if (Object.keys(this.__initialStoxyState).length > 0) {
                write(this.__stoxyKey, { ...this.__initialStoxyState });
            }
        }

        /**
         * @param {{ key: string, action: string, data: any; }} event
         */
        _updateProperties(event) {
            console.log(event);
            const data = event.data;
            const keys = Object.keys(data);
            if (this.__propertiesInUse.length <= 0) {
                this._initializeStoxyPropertiesInUse(keys);
            }
            this.__propertiesInUse.forEach((key) => {
                this[key] = data[key];
            });
        }

        /**
         * Enumerate the properties current element wants to use.
         *
         * Properties are determined by the initialstate object.
         * @param {string[]} keys
         */
        _initializeStoxyPropertiesInUse(keys) {
            const objectKeys = Object.keys(this);
            for (const key of keys) {
                const regex = new RegExp(`_{0,}${key}`);
                const hasProperty = objectKeys.some((k) => regex.test(k));
                if (hasProperty) {
                    this.__propertiesInUse.push(key);
                }
            }
        }
    };
}
