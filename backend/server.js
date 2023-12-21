import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';

//routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 3001;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


if (process.env.NODE_ENV === 'production') {

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  );
} else {

  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
app.listen(port, () => console.log(`Server running on port ${port}`));
