/**
 * @param {typeof HTMLElement} superclass
 */
export function StoxyElement(superclass: typeof HTMLElement): {
    new(): {
        __propertiesInUse: any[];
        __stoxyKey: any;
        __initialStoxyState: any;
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
        _updateStoxyProperties(event: {
            key: string;
            action: string;
            data: any;
        }): void;
        /**
         * @param {{ [x: string]: any; }} [data]
         */
        _updateStoxyPropertyValues(data?: {
            [x: string]: any;
        }): any;
        /**
         * @param {Map<string, any>} updatedProperties
         */
        _dispatchStoxyUpdated(updatedProperties: any): void;
        /**
         * @param {Map<string, any>} _updatedProperties
         **/
        stoxyUpdated(_updatedProperties: any): void;
        /**
         * Enumerate the properties current element wants to use.
         *
         * Properties are determined by the initialstate object.
         * @param {string[]} keys
         */
        _initializeStoxyPropertiesInUse(keys: string[]): void;
    };
};
