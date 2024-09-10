import mongoose from "mongoose";

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("error connecting to database: ", error);
    }
}