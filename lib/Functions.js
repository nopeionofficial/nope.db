const fs = require("fs");
const Config = require("../lib/Config.json");
const DatabaseError = require("../lib/Error.js");

module.exports.read = function () {
    return JSON.parse(fs.readFileSync(`./${Config.databaseFileName}.json`, "utf-8"));
};

module.exports.write = function (data) {
    fs.writeFileSync(`./${Config.databaseFileName}.json`, JSON.stringify(data, null, Config.spaces));
};

module.exports.checkDatabase = function () {
    try {
        this.read();
    } catch (error) {
        this.write({});
    };
};

module.exports.deleteFunc = function (id) {
    const allData = this.read();
    let info = "";
    id.split(".").forEach((x, y, z) => {
        info += `["${x.replace(/\n/g, "\\n")}"]`;
        if (y === (z.length - 1)) {
            eval(`allData${info} = ${this.stringifyData(undefined)}`);
        } else {
            if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
        };
    });
    this.write(allData);
    return eval(`allData${info}`) ? eval(`allData${info}`) : null;
};

module.exports.setFunc = function (id, value) {
    const allData = this.read();
    let info = "";
    id.split(".").forEach((x, y, z) => {
        info += `["${x.replace(/\n/g, "\\n")}"]`;
        if (y === (z.length - 1)) {
            eval(`allData${info} = ${this.stringifyData(value)}`);
        } else {
            if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
        };
    });
    this.write(allData);
    return eval(`allData${info}`) ? eval(`allData${info}`) : null;
};

module.exports.clearFunc = function () {
    try {
        this.write({});
    } catch (error) {
        console.error(error);
        return false;
    };
    return true;
};

module.exports.backupFunc = function (fileName) {
    try {
        fs.writeFileSync(fileName, JSON.stringify(this.read(), null, Config.spaces));
        return true;
    } catch (error) {
        throw new DatabaseError(error);
    };
};

module.exports.loadBackupFunc = function (fileName) {
    const backupFile = JSON.parse(fs.readFileSync(fileName, "utf-8"));
    try {
        fs.writeFileSync(`./${Config.databaseFileName}.json`, JSON.stringify(backupFile, null, Config.spaces));
        return true;
    } catch (error) {
        throw new DatabaseError(error);
    };
};

module.exports.isArray = function (data) {
    return Boolean(Array.isArray(data));
};

module.exports.stringifyData = function (data) {
    if (typeof data === "string") return `"${data}"`;
    if (typeof data === "number") return data;
    if (typeof data === "object" && !(data instanceof Array)) return JSON.stringify(data);
    if (typeof data === "object" && (data instanceof Array)) return `[${data.map(func => this.stringifyData(func)).join(",")}]`;
    return data;
};
