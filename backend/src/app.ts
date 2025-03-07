import express, { Request, Response } from 'express';
import formRoutes from './routes/form';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Security middleware
app.use(helmet());
app.use(cors());

// Use the form routes
app.use('/api/form', formRoutes);

// Default route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Church Backend API');
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MongoDB is not defined in environment variables");
    process.exit(1); // Exit process with error
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit process with 
    });

    // Set up port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
