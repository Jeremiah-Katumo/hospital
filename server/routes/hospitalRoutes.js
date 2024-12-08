import express from 'express';
import injector from '../injectors/injector.js';
import { HospitalController } from '../controllers/Hospital.js';

const hospitalService = injector.get('HospitalService');
const hospitalController = new HospitalController(hospitalService);

const hospitalRouter = express.Router();

hospitalRouter.get('/doctors', (req, res) => hospitalController.getHospitalList(req, res))
    .get('/doctors/:id', (req, res) => hospitalController.getHospitalById(req, res))
    .get('/doctors/add', (req, res) => hospitalController.addHospital(req, res))
    .post('/doctors', (req, res) => hospitalController.postHospital(req, res))
    .get('/doctors/:id/edit', (req, res) => hospitalController.editHospital(req, res))
    .put('/doctors/:id', (req, res) => hospitalController.updateHospital(req, res))
    .get('/doctors/id/confirm_delete', (req, res) => hospitalController.confirmDeleteHospital(req, res))
    .post('/doctors/:id', (req, res) => hospitalController.deleteHospital(req, res))
    .get('/doctors/search/:id', (req, res) => hospitalController.searchHospital(req, res));

export default hospitalRouter;
