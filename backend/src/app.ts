import express, { Request, Response } from 'express';
import formRoutes from './routes/form';

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Use the form routes
app.use('/api/form', formRoutes);

// Default route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Church Backend API');
});

// Set up port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
