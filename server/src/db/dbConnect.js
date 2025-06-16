import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';  

const connectDB = async () => {
    try {
    const dbConnectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log("\nMongoDB connected successfully")
    console.log(dbConnectionInstance.connection.host)

    }catch(error){
        console.log("Database not connected:", error);
        process.exit(1); 
    }
}

export default connectDB;