const DatabaseError = require("../lib/Error.js");
const { write, stringifyData, validID, validValue } = require("../lib/Functions.js");
const { undefinedID, nonValidID, undefinedValue, nonValidValue } = require("../lib/Errors.json");
const get = require("./get.js");
const all = require("./all.js");

function set(id, value) {
    if (!id) throw new DatabaseError(undefinedID);
    if (!validID(id)) throw new DatabaseError(nonValidID);
    if (!value) throw new DatabaseError(undefinedValue);
    if (!validValue(value)) throw new DatabaseError(nonValidValue);
    const data = all();
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

module.exports = set;