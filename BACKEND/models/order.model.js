import mongoose, { Schema } from "mongoose";

// TODO: check repeated ids of products
const orderModel = new Schema({
    ticket: {
        type: Number,
        require: true
    },
    client: {
        type: String
    },
    ci: {
        type: String
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true
        },
        name: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        }
    }],
    totalAmount: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Order', orderModel);