import { Request, Response } from 'express';
import Form from '../models/formModel';

// Function to handle form submission
export const submitForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const newForm = new Form(req.body); // Create a new form entry
    await newForm.save(); // Save to MongoDB
    res.status(201).json({ message: 'Form submitted successfully', data: newForm });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
};

//  Function to retrieve form submission
export const getAllForms = async (req: Request, res: Response): Promise<void> => {
  try {
      // Fetch all forms from the database
      const forms = await Form.find(); // Retrieve all form records

      // Count the total nuymber of forms
      const totalForms = forms.length;

    // Send response with the forms and the total count
    res.status(200).json({
      message: 'Forms retrieved successfully',
      totalForms, // The total number of forms
      data: forms // The olist of forms
    });  
  } catch(error) {
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
};

// Function to delete a form by ID (DELETE)
export const deleteForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const formId = req.params.id; // Get the form ID from the URL params
    const deletedForm = await Form.findByIdAndDelete(formId); // Delete the form by ID

    if (!deletedForm) {
      res.status(404).json({ message: 'Form not found'});
      return;
    }
    res.status(200).json({ message: 'Form deleted successfully', data: deletedForm});
    } catch (error) {
      res.status(500).json({ message: 'Error deleting form', error});
    }
};