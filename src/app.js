const { checkDatabase } = require("./lib/Functions.js");

checkDatabase();

module.exports.add = require("./methods/add.js");
module.exports.all = require("./methods/all.js");
module.exports.backup = require("./methods/backup.js");
module.exports.clear = require("./methods/clear.js");
module.exports.get = require("./methods/get.js");
module.exports.has = require("./methods/has.js");
module.exports.loadBackup = require("./methods/load-backup.js");
module.exports.push = require("./methods/push.js");
module.exports.remove = require("./methods/remove.js");
module.exports.set = require("./methods/set.js");
module.exports.subtract = require("./methods/subtract.js");

module.exports.delete = require("./methods/remove.js");
module.exports.fetch = require("./methods/get.js");
module.exports.reset = require("./methods/clear.js");