import { Request, Response } from 'express';

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
