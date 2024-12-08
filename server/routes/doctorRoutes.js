import express from 'express';
import injector from '../injectors/injector.js';
import { DoctorController } from '../controllers/Doctor.js';

const doctorService = injector.get('DoctorService');
const doctorController = new DoctorController(doctorService);

const doctorRouter = express.Router();

doctorRouter.get('/doctors', (req, res) => doctorController.getDoctorList(req, res))
    .get('/doctors/:id', (req, res) => doctorController.getDoctorById(req, res))
    .get('/doctors/add', (req, res) => doctorController.addDoctor(req, res))
    .post('/doctors', (req, res) => doctorController.postDoctor(req, res))
    .get('/doctors/:id/edit', (req, res) => doctorController.editDoctor(req, res))
    .put('/doctors/:id', (req, res) => doctorController.updateDoctor(req, res))
    .get('/doctors/:id/confirm_delete', (req, res) => doctorController.confirmDeleteDoctor(req, res))
    .post('/doctors/:id', (req, res) => doctorController.deleteDoctor(req, res))
    .get('/doctors/:id/search', (req, res) => doctorController.searchDoctor(req, res));

export default doctorRouter;
