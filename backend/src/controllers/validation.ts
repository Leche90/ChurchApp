import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Define validation rules
export const validateForm = [
    body('firstName').isLength({ min: 1 }).withMessage('First name is required'),
    body('lastName').isLength({ min: 1 }).withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('phone').isMobilePhone('en-US').withMessage('Please provide a valid phone number'),
    body('address').isLength({ min: 1 }).withMessage('Address is required'),
    body('country').isLength({ min: 1 }).withMessage('Country is required'),
    body('password').isLength({ min: 10 }).withMessage('Password should be at least 10 characters long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    body('securityQuestion').isLength({ min: 1 }).withMessage('Security question is required'),
    body('securityAnswer').isLength({ min: 1 }).withMessage('Security answer is required'),
];

// Handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Fixing the 'errors' name (used 'error' instead of 'errors' in the response)
        res.status(400).json({ errors: errors.array() });
    }
    next();
};