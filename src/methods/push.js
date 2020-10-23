const DatabaseError = require("../lib/Error.js");
const { validID, validValue, isArray } = require("../lib/Functions.js");
const { undefinedID, nonValidID, undefinedValue, nonValidValue, mustBeArray } = require("../lib/Errors.json");
const get = require("./get.js");
const set = require("./set.js");

function push(id, value) {
    if (!id) throw new DatabaseError(undefinedID);
    if (!validID(id)) throw new DatabaseError(nonValidID);
    if (!value) throw new DatabaseError(undefinedValue);
    if (!validValue(value)) throw new DatabaseError(nonValidValue);
    if (!get(id) || get(id).length < 1) return set(id, [value]) ? get(id) : null;
    if (!isArray(get(id))) throw new DatabaseError(mustBeArray);
    var array = [];
    var data = get(id);
    if (data.length === 0) return false;
    data.forEach((val) => array.push(val));
    array.push(value);
    return set(id, array) ? get(id) : null;
};

module.exports = push;