const Methods = require("../src/lib/Utils.js");
const DatabaseError = require("../src/lib/Error.js");
const { existsSync, writeFileSync } = require("fs");
const { join } = require("path");
const Punctuation = new RegExp(/^[!"#%&'*,./?@^_|~-]+$/);

class db {
    /**
     * The settings object used to create the database
     * @typedef {Object} Settings
     * @property {string} path The path of the database
     * @property {number} spaces The spaces of the database file
     * @property {string} seperator Seperator for the ID's
     */
    /**
     * Create or get a database file
     * @param {Settings} settings Object of the settings
     * @throws {DatabaseError} If there are no settings or any settings are invalid
     */
    constructor(settings = {}) {
        //Settings
        if (!settings)
            throw new DatabaseError("The settings are required");
        if (typeof settings !== "object")
            throw new DatabaseError("The settings must be an object");
        // Path
        if (!settings.path)
            throw new DatabaseError("The path is required");
        if (typeof settings.path !== "string")
            throw new DatabaseError("The path must be an string");
        if (!settings.path.endsWith(".json"))
            throw new DatabaseError("This path does not output to a json file");
        // Spaces
        if (settings.spaces && typeof settings.spaces !== "number")
            throw new DatabaseError("The spaces of the database file is must be an number")
        else if (!settings.spaces) settings.spaces = 0;
        // Seperator
        if (!settings.seperator)
            throw new DatabaseError("The seperator is required");
        if (typeof settings.seperator !== "string")
            throw new DatabaseError("The seperator must be an string");
        if (!Punctuation.test(settings.seperator))
            throw new DatabaseError("Disallowed separator");
        if (settings.seperator.length != 1)
            throw new DatabaseError("Seperator length must be 1");
        /**
         * The settings of the database
         * @type {PrivateSettings}
         * @private
         */
        Object.defineProperty(this, "settings", {
            value: { ...settings, file: join(settings.path) }
        });
        /**
         * The methods
         * @type {Methods}
         * @private
         */
        Object.defineProperty(this, "methods", {
            value: new Methods({
                file: this.settings.file,
                spaces: this.settings.spaces,
                seperator: this.settings.seperator,
            })
        });
        // Checking the database file
        if (!existsSync(this.settings.file))
            writeFileSync(this.settings.file, "{}");
    };
    /**
     * Adds the value of an element in the database
     * @param {string} id The ID of the element
     * @param {number} value The value to be added
     * @returns {number} Result
     * @throws {DatabaseError} If the ID or value is invalid
     */
    add(id, value) {
        return this.methods.add(id, value);
    };
    /**
     * Return the all data on the database
     * @returns {object} The all data
     */
    all() {
        return this.methods.all();
    };
    /**
     * Deletes all the data in database
     * @returns {true} Indicates that it was cleared
     */
    clear() {
        return this.methods.clear();
    };
    /**
     * Deletes element from database
     * @param {string} id The ID of the element
     * @returns {boolean} Indicates that it was deleted
     * @throws {DatabaseError} If the ID is invalid
     */
    delete(id) {
        return this.methods.delete(id);
    };
    /**
     * Gets the element on the database
     * @param {string} id The ID of the element
     * @returns {*} The data
     * @throws {DatabaseError} If the ID is invalid
     */
    get(id) {
        return this.methods.get(id);
    };
    /**
     * Checks for data in the database
     * @param {string} id The ID of the element
     * @returns {boolean} Indicates presence
     * @throws {DatabaseError} If the ID is invalid
     */
    has(id) {
        return this.methods.has(id);
    };
    /**
     * Pushs the data in a array from database
     * @param {string} id The ID of the element
     * @param {*} value The pushed element
     * @returns {array} The array of the ID
     * @throws {DatabaseError} If the ID or value is invalid
     */
    push(id, value) {
        return this.methods.push(id, value);
    };
    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {*} value The value to be setted
     * @returns {*} The value setted
     * @throws {DatabaseError} If the ID or value is invalid
     */
    set(id, value) {
        return this.methods.set(id, value);
    };
    /**
     * Subtracts the value of an element in the database
     * @param {string} id The ID of the element
     * @param {number} value The value to be subtract
     * @returns {number} Result
     * @throws {DatabaseError} If the ID or value is invalid
     */
    subtract(id, value) {
        return this.methods.subtract(id, value);
    };
    // Alternative Methods
    /**
     * Gets the element on the database
     * @param {string} id The ID of the element
     * @returns {*} The data
     * @throws {DatabaseError} If the ID is invalid
     */
    fetch(id) {
        return this.get(id);
    };
    /**
     * Deletes element from database
     * @param {string} id The ID of the element
     * @returns {boolean} Indicates that it was deleted
     * @throws {DatabaseError} If the ID is invalid
     */
    remove(id) {
        return this.delete(id);
    };
    /**
     * Deletes all the data in database
     * @returns {true} Indicates that it was cleared
     */
    reset(id) {
        return this.delete(id);
    };
};
module.exports = db;
