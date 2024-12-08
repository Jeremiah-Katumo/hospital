import express from 'express';
import { PatientService } from '../services/patientServices.js';
import { PatientController } from '../controllers/Patient.js';
import { conn } from '../database/dbConnection.js'; // Assuming dbConnection is your MySQL connection

const patientRouter = express.Router();

// Create an instance of the service and controller
const patientService = new PatientService(conn);
const patientController = new PatientController(patientService);

// Patient routes
patientRouter.get('/patients', patientController.getPatientList);               // Get all patients
patientRouter.get('/patients/add', patientController.addPatient);              // Render add patient form
patientRouter.post('/patients', patientController.postPatient);                // Add a new patient
patientRouter.get('/patients/:id', patientController.getPatientById);          // View patient by ID
patientRouter.get('/patients/:id/edit', patientController.editPatient);        // Edit patient form
patientRouter.put('/patients/:id', patientController.updatePatient);          // Update patient details
patientRouter.get('/patients/:id/confirm_delete', patientController.confirmDeletePatient);  // Confirm delete patient
patientRouter.post('/patients/:id', patientController.deletePatient);       // Delete patient
patientRouter.get('/patients/:id/search', patientController.searchPatient);   // Search for patient by first name or id

export default patientRouter;
