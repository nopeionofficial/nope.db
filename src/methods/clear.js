const DatabaseError = require("../lib/Error.js");
const { clearFunction } = require("../lib/Utils.js");

function clear() {
    try {
        clearFunction();
        return true;
    } catch (error) {
        throw new DatabaseError(error);
    };
};

module.exports = clear;