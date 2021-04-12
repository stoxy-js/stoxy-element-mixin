import { sub, write, read, update } from "@stoxy/core";

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
                    state: { foo: "bar" }
                }
            `);
            }

            this.__propertiesInUse = []; // Initialized on first update
            this.__stoxyKey = properties.key;
            this.__initialStoxyState = properties.state;

            // Subscribe to update events
            sub(this.__stoxyKey, this._updateStoxyProperties.bind(this));

            // If init flag is set, initialize state data with given values
            if (properties.init) {
                // Update the current state instead of write. 
                // This is done to not overwrite state in the same object
                // if two objects initialize their own parts of the sate in the same key.
                if (Object.keys(this.__initialStoxyState).length > 0) {
                    update(this.__stoxyKey, stateObject => {
                        let newState = stateObject
                        if (!newState) {
                            newState = {};
                        }
                        for (const key of Object.keys(this.__initialStoxyState)) {
                            newState[key] = this.__initialStoxyState[key];
                        }
                        return newState;
                    });
                }
            } else {
                // If not a initializing component, first set the initial data given by the component.
                // Then try to fetch the latest data, 
                // else fallback to default state values declared in stoxyProperties
                const updatedProperties = this._updateStoxyPropertyValues(this.__initialStoxyState);
                this._dispatchStoxyUpdated(updatedProperties);
                read(this.__stoxyKey).then(data => {
                    if (!data) {
                        return;
                    }
                    const updatedProperties = this._updateStoxyPropertyValues(data);
                    this._dispatchStoxyUpdated(updatedProperties);
                });
            }
        }

        /**
         * Update Properties of the class instance the mixin is
         * attached to.
         *
         * __propertiesInUse is set the first time we update the properties.
         * __propertiesInUse contains the keys of the state object
         * which the current class is implementing and maps only those to be updated.
         *
         * @param {{ key: string, action: string, data: any; }} event
         */
        _updateStoxyProperties(event) {
            const data = event.data;
            const keys = Object.keys(data);
            // Initialize the properties
            if (this.__propertiesInUse.length <= 0) {
                this._initializeStoxyPropertiesInUse(keys);
            }
            // Iterate through the initialized property keys
            const updatedProperties = this._updateStoxyPropertyValues(data);
            this._dispatchStoxyUpdated(updatedProperties);
        }

        /**
         * @param {{ [x: string]: any; }} [data]
         */
        _updateStoxyPropertyValues(data) {
            const updatedProperties = new Map();
            this.__propertiesInUse.forEach((key) => {
                // Don't update unless the value has changed
                if (this[key] !== data[key]) {
                    updatedProperties.set(key, {
                        key,
                        oldValue: this[key],
                        newValue: data[key],
                    });
                    this[key] = data[key];
                }
            });
            return updatedProperties;
        }

        /**
         * @param {Map<string, any>} updatedProperties
         */
        _dispatchStoxyUpdated(updatedProperties) {
            if (updatedProperties.size > 0) {
                this.stoxyUpdated(updatedProperties);
            }
        }

        /**
         * @param {Map<string, any>} _updatedProperties
         **/
        stoxyUpdated(_updatedProperties) { }

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
