import express, { Router, Request, Response } from 'express';
import { submitForm, getAllForms, deleteForm } from '../controllers/formController';

const router: Router = express.Router();

// POST route to handle form submission
router.post('/', submitForm);

//GET route to retrieve all forms
router.get('/', getAllForms); // Add this route to fetch all forms

// DELETE route to delete a form by ID
router.delete('/:id', deleteForm); // The ID of the form is passed in the URL

export default router;
