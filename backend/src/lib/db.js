import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // FIXED: use process.env.MONGO_URI
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set in .env");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("MONGODB CONNECTED:", conn.connection.host);
    } catch (error) {
        console.log("❌ ERROR CONNECTING TO MONGODB:", error.message);
        process.exit(1);
    }
};
