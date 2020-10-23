const DatabaseError = require("../lib/Error.js");
const { undefinedFileName, notEndsWithDotJson } = require("../lib/Errors.json");
const { backupFunction } = require("../lib/Utils.js");

function backup(fileName) {
    if (!fileName) throw new DatabaseError(undefinedFileName);
    if (!fileName.endsWith(".json")) throw new DatabaseError(notEndsWithDotJson);
    return Boolean(backupFunction(fileName));
};

module.exports = backup;