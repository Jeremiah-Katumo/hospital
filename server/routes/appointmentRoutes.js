import express from 'express';
import injector from '../injectors/injector.js';
import { AppointmentController } from '../controllers/Appointment.js';


const appointmentService = injector.get('AppointmentService');
const appointmentController = new AppointmentController(appointmentService);

employerRouter = express.Router();

employerRouter.get('/appointments', (req, res) => appointmentController.getAppointmentList(req, res))
    .get('/appointments/:id', (req, res) => appointmentController.getAppointmentById(req, res))
    .get('/appointments/add', (req, res) => appointmentController.addAppointment(req, res))
    .post('/appointments/save', (req, res) => appointmentController.postAppointment(req, res))
    .get('/appointments/edit/:id', (req, res) => appointmentController.editAppointment(req, res))
    .post('/appointments/update/:id', (req, res) => appointmentController.updateAppointment(req, res))
    .get('/appointments/delete/:id', (req, res) => appointmentController.confirmDeleteAppointment(req, res))
    .post('/appointments/delete/:id', (req, res) => appointmentController.deleteAppointment(req, res))
    .get('/appointments/search', (req, res) => appointmentController.searchAppointment(req, res));


export default employerRouter;