import mongoose from "mongoose";

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
            .then(connect => console.log('DB connected to ' + connect.connection.host))
            .catch(err => console.error(err));
            
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;