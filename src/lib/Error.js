class DatabaseError extends Error {
    constructor(message = "Unknown error") {
        super();
        this.name = "nopedb";
        this.message = message;
    };
};

module.exports = DatabaseError;