const fs = require("fs");
const DatabaseError = require("./Error.js");
const { read, write, stringifyData } = require("./Functions.js");
const { databaseFileName, spaces } = require("../Config.json");
const get = require("../methods/get.js");

function removeFunction(id) {
    const data = read();
    let info = "";
    id.split(".").forEach((x, y, z) => {
        info += `["${x.replace(/\n/g, "\\n")}"]`;
        if (y === (z.length - 1)) {
            eval(`data${info} = ${stringifyData(undefined)}`);
        } else {
            if (!eval(`data${info}`)) eval(`data${info} = {};`);
        };
    });
    write(data);
    return eval(`data${info}`) || null;
};

function setFunction(id, value) {
    const data = read();
    let info = "";
    id.split(".").forEach((x, y, z) => {
        info += `["${x.replace(/\n/g, "\\n")}"]`;
        if (y === (z.length - 1)) {
            eval(`data${info} = ${stringifyData(value)}`);
        } else {
            if (!eval(`data${info}`)) eval(`data${info} = {};`);
        };
    });
    write(data);
    return get(id) || null;
};


function clearFunction() {
    try {
        write({});
    } catch (error) {
        throw new DatabaseError(error);
    };
    return true;
};

function backupFunction(fileName) {
    try {
        fs.writeFileSync(fileName, JSON.stringify(read(), null, spaces));
        return true;
    } catch (error) {
        throw new DatabaseError(error);
    };
};

function loadBackupFunction(fileName) {
    const backupFile = JSON.parse(fs.readFileSync(fileName, "utf-8"));
    try {
        fs.writeFileSync(databaseFileName, JSON.stringify(backupFile, null, spaces));
        return true;
    } catch (error) {
        throw new DatabaseError(error);
    };
};

module.exports = {
    removeFunction,
    setFunction,
    clearFunction,
    backupFunction,
    loadBackupFunction
};