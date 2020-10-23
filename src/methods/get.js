const DatabaseError = require("../lib/Error.js");
const { undefinedID, nonValidID } = require("../lib/Errors.json");
const { validID } = require("../lib/Functions.js");
const all = require("./all.js");

function get(id) {
    if (!id) throw new DatabaseError(undefinedID);
    if (!validID(id)) throw new DatabaseError(nonValidID);
    const data = all();
    let info = "";
    id.split(".").forEach((x, y, z) => {
        info += `["${x.replace(/\n/g, "\\n")}"]`;
        if (y === (z.length - 1)) return;
        if (!eval(`data${info}`)) eval(`data${info} = {};`);
    });
    return eval(`data${info}`) || null;
};

module.exports = get;