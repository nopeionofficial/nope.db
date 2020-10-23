const DatabaseError = require("../lib/Error.js");
const { validID } = require("../lib/Functions.js");
const { removeFunction } = require("../lib/Utils.js");
const { undefinedID, nonValidID } = require("../lib/Errors.json");
const get = require("./get.js");

function remove(id) {
    if (!id) throw new DatabaseError(undefinedID);
    if (!validID(id)) throw new DatabaseError(nonValidID);
    if (get(id) === null) return false;
    removeFunction(id);
    if (get(id) === null) return true;
};

module.exports = remove;