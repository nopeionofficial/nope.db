const fs = require("fs");
const DatabaseError = require("../lib/Error.js");
const Errors = require("../lib/Errors.json");
const Config = require("../lib/Config.json");

createDatabase();

class nopeDatabase {

    static get(key) {
        const allData = this.all();
        let info = "";
        key.split(".").forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1)) return;
            if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
        });
        return eval(`allData${info}`) ? eval(`allData${info}`) : null;
    };

    static set(key, value) {
        if (!key) throw new DatabaseError(Errors.undefinedKey);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        const allData = this.all();
        let info = "";
        key.split(".").forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1)) {
                eval(`allData${info} = ${stringifyData(value)}`);
            } else {
                if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
            };
        });
        write(allData);
        return this.get(key);
    };

    static delete(key) {
        if (!key) throw new DatabaseError(Errors.undefinedKey);
        if (this.has(key) === false) return false;
        deleteFunction(key, undefined);
        if (this.get(key) === null) return true;
    };

    static push(key, value) {
        if (!key) throw new DatabaseError(Errors.undefinedKey);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        if (!this.get(key) || this.get(key).length < 1) return this.set(key, [value]) ? this.get(key) : false;
        if (isArray(this.get(key)) === false) throw new DatabaseError(Errors.mustBeArray);
        var array = [];
        var data = this.get(key);
        if (data.length === 0) return false;
        data.forEach((func) => array.push(func));
        array.push(value);
        return this.set(key, array) ? this.get(key) : null;
    };

    static add(key, value) {
        if (!key) throw new DatabaseError(Errors.undefinedKey);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        if (typeof value !== "number") throw new DatabaseError(Errors.mustBeANumber);
        var data = this.get(key);
        if (data === null) return this.set(key, value);
        if (typeof data !== "number") throw new DatabaseError(Errors.dataNotANumber);
        var result = data + value;
        this.set(key, result);
        if (this.get(key) === null) return Number(0);
        return Number(this.get(key));
    };

    static subtract(key, value) {
        if (!key) throw new DatabaseError(Errors.undefinedKey);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        if (typeof value !== "number") throw new DatabaseError(Errors.mustBeANumber);
        var data = this.get(key);
        if (data === null) return this.set(key, value);
        if (typeof data !== "number") throw new DatabaseError(Errors.dataNotANumber);
        return Number(this.add(key, -value));
    };

    static has(key) {
        return Boolean(this.get(key));
    };

    static all() {
        return read();
    };

    static clear() {
        return Boolean(clearFunction());
    };

    static backup(fileName) {
        if (!fileName) throw new DatabaseError(Errors.undefinedFileName);
        if (!fileName.endsWith(".json")) throw new DatabaseError(Errors.notEndsWithDotJson);
        const allData = this.all();
        try {
            fs.writeFileSync(fileName, JSON.stringify(allData, null, Config.spaces));
            return true;
        } catch (error) {
            throw new DatabaseError(error);
        };
    };

    static loadBackup(fileName) {
        if (!fileName) throw new DatabaseError(Errors.undefinedFileName);
        if (!fileName.endsWith(".json")) throw new DatabaseError(Errors.notEndsWithDotJson);
        const allData = JSON.parse(fs.readFileSync(fileName, "utf-8"));
        try {
            fs.writeFileSync(`./${Config.databaseFileName}.json`, JSON.stringify(allData, null, Config.spaces));
            return true;
        } catch (error) {
            throw new DatabaseError(error);
        };
    };

    /**
    *
    * Alternative Parameters
    * 
    */

    static fetch(key) {
        return this.get(key);
    };

    static remove(key) {
        return this.delete(key);
    };
};

/**
*
* Functions
* 
*/

function createDatabase() {
    try {
        read();
    } catch (error) {
        write({});
    };
};

function deleteFunction(key, value) {
    const allData = read();
    let info = "";
    key.split(".").forEach((x, y, z) => {
        info += `["${x.replace(/\n/g, "\\n")}"]`;
        if (y === (z.length - 1)) {
            eval(`allData${info} = ${stringifyData(value)}`);
        } else {
            if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
        };
    });
    write(allData);
    return eval(`allData${info}`) ? eval(`allData${info}`) : null;
};

function clearFunction() {
    try {
        write({});
    } catch (error) {
        console.error(error);
        return false;
    };
    return true;
};

function isArray(data) {
   return Boolean(Array.isArray(data));
};

function read() {
    return JSON.parse(fs.readFileSync(`./${Config.databaseFileName}.json`, "utf-8"));
};

function write(data) {
    fs.writeFileSync(`./${Config.databaseFileName}.json`, JSON.stringify(data, null, Config.spaces));
};

function stringifyData(data) {
    if (typeof data === "string") return `"${data}"`;
    if (typeof data === "number") return data;
    if (typeof data === "object" && !(data instanceof Array)) return JSON.stringify(data);
    if (typeof data === "object" && (data instanceof Array)) return `[${data.map(func => stringifyData(func)).join(",")}]`;
    return data;
};

module.exports = nopeDatabase;
