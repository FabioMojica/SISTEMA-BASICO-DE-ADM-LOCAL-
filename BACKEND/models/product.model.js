import mongoose, { Schema } from 'mongoose'

// TODO: verify input lowercase

const productModel = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Product', productModel);