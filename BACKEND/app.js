import express from 'express';
import morgan from 'morgan';
import connectToMongoDB from './db.js';
import productsRouter from './routes/products.routes.js';
import salesRouter from './routes/sales.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import upload from './config/multer.config.js';


const app = express();

app.use(express.json());

app.use(cors({/*
    origin: (origin, callback) => {
        callback(null, origin); // Permite cualquier origen
    },*/
    origin: 'http://localhost:5173',
    credentials: true, // Access to credentials
}));


app.use(morgan('dev'));

connectToMongoDB();

app.use(cookieParser());

// Middleware works to serve static files
app.use('/uploads', express.static('uploads'));

const PORT = 3000;

app.use('/api', authRouter);

app.use('/api/products', productsRouter);

app.use('/api/sales', salesRouter);

app.listen(PORT, () => {
    console.log(`app listen on port ${PORT}`);
});
