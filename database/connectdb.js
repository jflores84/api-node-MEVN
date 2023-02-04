import mongoose from "mongoose";
import {config} from "dotenv";
config();

try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.URI_MONGO);
    console.log("😎😎 db conectada");
} catch (error) {
    console.log("😒😒" + error);
}

