import mongoose from "mongoose";

import env from "./env.js";

const connectDb = async () => {
    try {
        await mongoose.connect(env.MONGO_URL)
        console.log("Db connected")
    } catch (error) {
        console.log("Db Connection Error", error.message)
    }
}

export default connectDb