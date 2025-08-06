import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

if (!USERNAME || !PASSWORD) {
    console.log("Error reading for .env");
    process.exit(1);
} const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.vhgl4lx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Connect to DB
const initMongo = async () => {
    try {
        await mongoose.connect(
            uri, { timeoutMS: 4000 }
        );
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting database");
        process.exit(1);
    }
};

export default initMongo;