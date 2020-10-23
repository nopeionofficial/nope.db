const fs = require("fs");
const { databaseFileName, spaces } = require("../Config.json");

function read() {
    return JSON.parse(fs.readFileSync(databaseFileName, "utf-8"));
};

function write(data) {
    fs.writeFileSync(databaseFileName, JSON.stringify(data, null, spaces));
};

function validID(id) {
    if (typeof id !== "string" ||
        id.length < 1 ||
        !id.match(/^[a-zA-Z0-9\.]+$/) ||
        id.split(".").includes("") ||
        id.endsWith(".") ||
        id.startsWith(".")) return false;
    return true;
};

function validValue(value) {
    if (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "object" ||
        typeof value === "boolean" ||
        typeof value === "undefined") return true;
    return false;
};

function checkDatabase() {
    try {
        read();
    } catch (error) {
        write({});
    };
};

function isArray(data) {
    return Boolean(Array.isArray(data));
};

function stringifyData(data) {
    if (typeof data === "string") return `"${data}"`;
    if (typeof data === "number") return data;
    if (typeof data === "object" && !(data instanceof Array)) return JSON.stringify(data);
    if (typeof data === "object" && (data instanceof Array)) return `[${data.map(func => stringifyData(func)).join(",")}]`;
    return data;
};

module.exports = {
    read,
    write,
    checkDatabase,
    isArray,
    validID,
    validValue,
    stringifyData
};