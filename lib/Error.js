class nopedbError extends Error {

    constructor(message = "Unknown error") {
        super();
        this.name = "nopedbError";
        this.message = message;
    };
};

module.exports = nopedbError;