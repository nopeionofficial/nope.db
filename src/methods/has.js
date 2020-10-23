const DatabaseError = require("../lib/Error.js");
const { undefinedID, nonValidID } = require("../lib/Errors.json");
const { validID } = require("../lib/Functions.js");
const get = require("./get.js");

function has(id) {
    if (!id) throw new DatabaseError(undefinedID);
    if (!validID(id)) throw new DatabaseError(nonValidID);
    return Boolean(get(id));
};

module.exports = has;