import express from 'express';
import injector from '../injectors/injector.js';
import { DiagnosisController } from '../controllers/Diagnosis.js';


const diagnosisService = injector.get('DiagnosisService');
const diagnosistController = new DiagnosisController(diagnosisService);

const diagnosisRouter = express.Router();

diagnosisRouter.get('/diagnosis', (req, res) => diagnosistController.getDiagnosisList(req, res))
    .get('/diagnosis/:id', (req, res) => diagnosistController.getDiagnosisById(req, res))
    .get('/diagnosis/add', (req, res) => diagnosistController.addDiagnosis(req, res))
    .post('/diagnosis', (req, res) => diagnosistController.postDiagnosis(req, res))
    .get('/diagnosis/:id/edit', (req, res) => diagnosistController.editDiagnosis(req, res))
    .put('/diagnosis/:id', (req, res) => diagnosistController.updateDiagnosis(req, res))
    .get('/diagnosis/:id/confirm_delete', (req, res) => diagnosistController.confirmDeleteDiagnosis(req, res))
    .post('/diagnosis/:id', (req, res) => diagnosistController.deleteDiagnosis(req, res))
    .get('/diagnosis/:id/search', (req, res) => diagnosistController.searchDiagnosis(req, res));


export default diagnosisRouter;