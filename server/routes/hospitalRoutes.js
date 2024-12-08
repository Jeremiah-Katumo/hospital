import express from 'express';
import injector from '../injectors/injector.js';
import { HospitalController } from '../controllers/Hospital.js';

const hospitalService = injector.get('HospitalService');
const hospitalController = new HospitalController(hospitalService);

const hospitalRouter = express.Router();

hospitalRouter.get('/hospitals', (req, res) => hospitalController.getHospitalList(req, res))
    .get('/hospitals/:id', (req, res) => hospitalController.getHospitalById(req, res))
    .get('/hospitals/add', (req, res) => hospitalController.addHospital(req, res))
    .post('/hospitals', (req, res) => hospitalController.postHospital(req, res))
    .get('/hospitals/:id/edit', (req, res) => hospitalController.editHospital(req, res))
    .put('/hospitals/:id', (req, res) => hospitalController.updateHospital(req, res))
    .get('/hospitals/:id/confirm_delete', (req, res) => hospitalController.confirmDeleteHospital(req, res))
    .post('/hospitals/:id', (req, res) => hospitalController.deleteHospital(req, res))
    .get('/hospitals/:id/search', (req, res) => hospitalController.searchHospital(req, res));

export default hospitalRouter;
