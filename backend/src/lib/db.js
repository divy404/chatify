import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        
        if (!ENV.MONGO_URI) {
            throw new Error("MONGO_URI is not set in .env");
        }

        const conn = await mongoose.connect(ENV.MONGO_URI);

        console.log("MONGODB CONNECTED:", conn.connection.host);
    } catch (error) {
        console.log("ERROR CONNECTING TO MONGODB:", error.message);
        process.exit(1);
    }
};
