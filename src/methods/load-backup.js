const DatabaseError = require("../lib/Error.js");
const { undefinedFileName, notEndsWithDotJson } = require("../lib/Errors.json");
const { loadBackupFunction } = require("../lib/Utils.js");

function loadBackup(fileName) {
    if (!fileName) throw new DatabaseError(undefinedFileName);
    if (!fileName.endsWith(".json")) throw new DatabaseError(notEndsWithDotJson);
    return Boolean(loadBackupFunction(fileName));
};

module.exports = loadBackup;