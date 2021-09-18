import mongoose from "mongoose";

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_PATH,
} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_PATH}`)
    .catch(error => console.log(error));
