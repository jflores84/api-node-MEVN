import mongoose from "mongoose";
import {config} from "dotenv";
config();

const connectionpOptions = {
    dbName: 'db_example',
  //  useNewParser: true,
//    useUnifiedTopology: true,

  }

try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.URI_MONGO,connectionpOptions);
    console.log("😎😎 db conectada");
} catch (error) {
    console.log("😒😒" + error);
}

