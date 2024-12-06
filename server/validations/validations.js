import { check, validationResult } from "express-validator";

export const useDoctorValidator = [];

export const useEmployerValidator = [];

export const useLeaveValidator = [
    check('first_name').notEmpty(),
    check('last_name').notEmpty(),
    check('leave_type').notEmpty(),
    check('date_from').notEmpty().withMessage('Select a date'),
    check('date_to').notEmpty().withMessage('Select a date'),
    check('reason').notEmpty().withMessage('Specify a reason')
];