import mongoose from "mongoose";
import config from "./config.js";

const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log("Db connected")
    } catch (error) {
        console.log("Db Connection Error", error.message)
    }
}

export default connectDb