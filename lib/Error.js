class nopeDatabaseError extends Error {

    constructor(message = "Unknown error") {
        super();
        this.name = "nopeDatabaseError";
        this.message = message;
    };
};

module.exports = nopeDatabaseError;