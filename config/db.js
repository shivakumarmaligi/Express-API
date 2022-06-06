const { connect } = require("mongoose");
const { NODE_ENV, LOCAL_MONGODB_URL, CLOUD_MONGODB_URL } = require("./index");
const { success, error} = require("consola");



exports.DBConnection = async () => {
    try {
        if (NODE_ENV === "development") {
            await connect(LOCAL_MONGODB_URL);
            success("LOCAL Instance Database Connected");
        }
        else {
            await connect(CLOUD_MONGODB_URL);
            success("CLOUD Instance Database Connected");
        }
    } catch (err) {
        error(err);
    }
};