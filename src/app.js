const DatabaseError = require("../lib/Error.js");
const Errors = require("../lib/Errors.json");
const Functions = require("../lib/Functions.js");

Functions.checkDatabase();

class nopedb {

    static get(id) {
        if (!id) throw new DatabaseError(Errors.undefinedId);
        const allData = this.all();
        let info = "";
        id.split(".").forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1)) return;
            if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
        });
        return eval(`allData${info}`) ? eval(`allData${info}`) : null;
    };

    static set(id, value) {
        if (!id) throw new DatabaseError(Errors.undefinedId);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        const allData = this.all();
        let info = "";
        id.split(".").forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1)) {
                eval(`allData${info} = ${Functions.stringifyData(value)}`);
            } else {
                if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
            };
        });
        Functions.write(allData);
        return this.get(id);
    };

    static delete(id) {
        if (!id) throw new DatabaseError(Errors.undefinedId);
        if (this.has(id) === false) return false;
        Functions.deleteFunc(id);
        if (this.get(id) === null) return true;
    };

    static push(id, value) {
        if (!id) throw new DatabaseError(Errors.undefinedId);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        if (!this.get(id) || this.get(id).length < 1) return this.set(id, [value]) ? this.get(id) : null;
        if (Functions.isArray(this.get(id)) === false) throw new DatabaseError(Errors.mustBeArray);
        var array = [];
        var data = this.get(id);
        if (data.length === 0) return false;
        data.forEach((func) => array.push(func));
        array.push(value);
        return this.set(id, array) ? this.get(id) : null;
    };

    static add(id, value) {
        if (!id) throw new DatabaseError(Errors.undefinedId);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        if (typeof value !== "number") throw new DatabaseError(Errors.mustBeANumber);
        var data = this.get(id);
        if (data === null) return Functions.setFunc(id, value);
        if (typeof data !== "number") throw new DatabaseError(Errors.dataNotANumber);
        Functions.setFunc(id, (data + value));
        if (this.get(id) === null) return Number(0);
        return Number(this.get(id));
    };

    static subtract(id, value) {
        if (!id) throw new DatabaseError(Errors.undefinedId);
        if (!value) throw new DatabaseError(Errors.undefinedValue);
        if (typeof value !== "number") throw new DatabaseError(Errors.mustBeANumber);
        var data = this.get(id);
        if (data === null) return Functions.setFunc(id, -value);
        if (typeof data !== "number") throw new DatabaseError(Errors.dataNotANumber);
        return Number(this.add(id, -value));
    };

    static has(id) {
        if (!id) throw new DatabaseError(Errors.undefinedId);
        return Boolean(this.get(id));
    };

    static all() {
        return Functions.read();
    };

    static clear() {
        return Boolean(Functions.clearFunc());
    };

    static backup(fileName) {
        if (!fileName) throw new DatabaseError(Errors.undefinedFileName);
        if (!fileName.endsWith(".json")) throw new DatabaseError(Errors.notEndsWithDotJson);
       return Boolean(Functions.backupFunc(fileName));
    };

    static loadBackup(fileName) {
        if (!fileName) throw new DatabaseError(Errors.undefinedFileName);
        if (!fileName.endsWith(".json")) throw new DatabaseError(Errors.notEndsWithDotJson);
        return Boolean(Functions.loadBackupFunc(fileName));
    };

    static fetch(id) {
        return this.get(id);
    };

    static remove(id) {
        return this.delete(id);
    };

    static reset() {
        return this.clear();
    };
};

module.exports = nopedb;