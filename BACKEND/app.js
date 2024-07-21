import express from 'express';
import morgan from 'morgan';
import connectToMongoDB from './db.js';
import productsRouter from './routes/products.routes.js';
import ordersRouter from './routes/orders.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin); // Permite cualquier origen
    },
    //origin: 'http://localhost:5173',
    credentials: true // Access to credentials
}));

app.use(morgan('dev'));

connectToMongoDB();

app.use(cookieParser());

const PORT = 3000;

app.use('/api', authRouter);

app.use('/api/products', productsRouter);

app.use('/api/orders', ordersRouter);

app.listen(PORT, () => {
    console.log(`app listen on port ${PORT}`);
});
