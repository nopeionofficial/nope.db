const DatabaseError = require("../lib/Error.js");
const { validID, validValue } = require("../lib/Functions.js");
const { undefinedID, nonValidID, undefinedValue, nonValidValue, mustBeANumber, dataNotANumber } = require("../lib/Errors.json");
const { setFunction } = require("../lib/Utils.js");
const get = require("./get.js");

function subtract(id, value) {
    if (!id) throw new DatabaseError(undefinedID);
    if (!validID(id)) throw new DatabaseError(nonValidID);
    if (!value) throw new DatabaseError(undefinedValue);
    if (!validValue(value)) throw new DatabaseError(nonValidValue);
    if (typeof value !== "number") throw new DatabaseError(mustBeANumber);
    var data = get(id);
    if (!data) return setFunction(id, -value);
    if (typeof data !== "number") throw new DatabaseError(dataNotANumber);
    setFunction(id, (data - value));
    if (!get(id)) return Number(0);
    return Number(get(id));
};

module.exports = subtract;