const Methods = require("../src/lib/Utils.js");
const DatabaseError = require("../src/lib/Error.js");
const Errors = require("../src/lib/Errors.json");
const { existsSync, writeFileSync } = require("fs");
const { join } = require("path");

const Letter = new RegExp(/[a-zA-Z0-9_]+/g);
const Punctuation = new RegExp(/^[!"#%&'*,./?@^_|~-]+$/);

class db {
    /**
     * The settings object used to create the database
     * @typedef {Object} Settings
     * @property {string} dir The directory path of the database
     * @property {string} name The name of the database
     * @property {number} spaces The spaces of the database file
     * @property {string} seperator Seperator for the ID's
     * @property {string} language The language of the database Defeault: English
     */

    /**
     * Create or get a database file
     * @param {Settings} settings Object of the settings
     * @throws {DatabaseError} İf there are no settings or any settings are invalid
     */
    constructor(settings = {}) {
        if (!settings)
            throw new DatabaseError(Errors.required);
        if (typeof settings !== "object")
            throw new DatabaseError(Errors.mustBeObject);

        // Directory
        if (!settings.dir)
            throw new DatabaseError(Errors.dir);
        if (typeof settings.dir !== "string")
            throw new DatabaseError(Errors.dir2);
        if (!existsSync(settings.dir))
            throw new DatabaseError(Errors.dir3);

        // Name
        if (!settings.name)
            throw new DatabaseError(Errors.name);
        if (typeof settings.name !== "string")
            throw new DatabaseError(Errors.name2);
        if (!Letter.test(settings.name))
            throw new DatabaseError(Errors.name4);
        if (settings.name.length < 1)
            throw new DatabaseError(Errors.name3);

        // Spaces
        if (settings.spaces && typeof settings.spaces !== "number")
            throw new DatabaseError(Errors.spaces)
        else if (!settings.spaces) settings.spaces = 0;

        // Seperator
        if (!settings.seperator)
            throw new DatabaseError(Errors.seperator);
        if (typeof settings.seperator !== "string")
            throw new DatabaseError(Errors.seperator2);
        if (!Punctuation.test(settings.seperator))
            throw new DatabaseError(Errors.seperator3);
        if (settings.seperator.length > 1)
            throw new DatabaseError(Errors.seperator4);
        
        // Language
        if (settings.language && typeof settings.language !== "string")
            throw new DatabaseError(Errors.lang);

        /**
         * The settings of the database
         * @type {PrivateSettings}
         * @private
         */

        Object.defineProperty(this, "settings", {
            value: { ...settings, file: join(settings.dir, `${settings.name}.json`) }
        });

        /**
        * The language of the database
        * @type {DatabaseLanguage}
        * @private
        */

        Object.defineProperty(this, "lang", {
            value: this.settings.language ? require(`./lib/Language/${this.settings.language}`) : require("./lib/Language/en-US.json")
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
                language: this.lang
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
     * @returns {number} Value plus data value
     * @throws {DatabaseError} If the ID or value is invalid
     */

    add(id, value) {
        return this.methods.add(id, value);
    };

    /**
     * Subtracts the value of an element in the database
     * @param {string} id The ID of the element
     * @param {number} value The value to be subtract
     * @returns {number} Value minus data value
     * @throws {DatabaseError} If the ID or value is invalid
     */

    subtract(id, value) {
        return this.methods.subtract(id, value);
    };

    /**
     * Return the all data on the database
     * @returns {object} The all data
     */

    all() {
        return this.methods.all();
    };

    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {*} value The value to be seted
     * @returns {*} The seted data
     * @throws {DatabaseError} If the ID or value is invalid
     */

    set(id, value) {
        return this.methods.set(id, value);
    };

    /**
     * Checks for data in the database
     * @param {string} id The ID of the element
     * @returns {boolean} For the element
     * @throws {DatabaseError} If the ID is invalid
     */

    has(id) {
        return this.methods.has(id);
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
     * Deletes element from database
     * @param {string} id The ID of the element
     * @returns {boolean} Indicates that it was deleted
     * @throws {DatabaseError} If the ID is invalid
     */

    delete(id) {
        return this.methods.delete(id);
    };

    /**
     * Deletes all the data in database
     * @returns {true} Indicates that it was cleared
     */

    clear() {
        return this.methods.clear();
    };

    /**
     * Pushs the data in a array from database
     * @param {string} id The ID of the element
     * @param {*} value The pushed element
     * @returns {array} The array of the ID
     * @throws {DatabaseError} İf the ID or value is invalid
     */

    push(id, value) {
        return this.methods.push(id, value);
    };

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
};

module.exports = db;
