import { Request, Response } from 'express';
import Form from '../models/formModel';

export const submitForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const newForm = new Form(req.body); // Create a new form entry
    await newForm.save(); // Save to MongoDB
    res.status(201).json({ message: 'Form submitted successfully', data: newForm });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
};
