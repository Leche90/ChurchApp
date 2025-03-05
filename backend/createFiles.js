const fs = require('fs');
const path = require('path');

// Function to create directories and files
function createFileStructure() {
  const baseDir = path.join(__dirname, 'church-backend', 'src');

  // Directories to be created
  const dirs = [
    path.join(baseDir, 'routes'),
    path.join(baseDir, 'controllers'),
    path.join(baseDir, 'models'),
  ];

  // Create directories
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });

  // Files to be created
  const files = {
    'src/app.ts': `import express, { Request, Response } from 'express';
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
    console.log(\`Server is running on port \${PORT}\`);
});
`,

    'src/routes/form.ts': `import express, { Router, Request, Response } from 'express';
import { submitForm } from '../controllers/formController';

const router: Router = express.Router();

// POST route to handle form submission
router.post('/', submitForm);

export default router;
`,

    'src/controllers/formController.ts': `import { Request, Response } from 'express';

// Sample data model (in real implementation, you would interact with a database)
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  password: string;
}

export const submitForm = (req: Request, res: Response): void => {
  const formData: FormData = req.body;

  // In a real app, you would save the form data to a database (e.g., MongoDB)
  console.log('Form data received:', formData);

  // Respond to the client
  res.status(201).json({
    message: 'Form submitted successfully',
    data: formData
  });
};
`,

    'src/models/formModel.ts': `// Placeholder for MongoDB schema
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  password: string;
}
`
  };

  // Create the files
  for (const [filePath, content] of Object.entries(files)) {
    const fileFullPath = path.join(__dirname, 'church-backend', filePath);
    if (!fs.existsSync(fileFullPath)) {
      fs.writeFileSync(fileFullPath, content);
      console.log(`Created file: ${fileFullPath}`);
    }
  }
}

// Run the function to create the files and folders
createFileStructure();
