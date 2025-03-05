import express, { Router, Request, Response } from 'express';
import { submitForm } from '../controllers/formController';

const router: Router = express.Router();

// POST route to handle form submission
router.post('/', submitForm);

export default router;
