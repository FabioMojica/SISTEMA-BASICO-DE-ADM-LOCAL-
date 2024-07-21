import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/foodBusiness_db');
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongoDB;
