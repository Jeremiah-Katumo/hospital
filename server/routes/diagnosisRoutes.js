import express from 'express';
import injector from '../injectors/injector.js';
import { DiagnosisController } from '../controllers/Diagnosis.js';


const diagnosisService = injector.get('DiagnosisService');
const diagnosistController = new DiagnosisController(diagnosisService);

diagnosisRouter = express.Router();

diagnosisRouter.get('/departments', (req, res) => diagnosistController.getDiagnosisList(req, res))
    .get('/departments/:id', (req, res) => diagnosistController.getDiagnosisById(req, res))
    .get('/departments/add', (req, res) => diagnosistController.addDiagnosis(req, res))
    .post('/departments/save', (req, res) => diagnosistController.postDiagnosis(req, res))
    .get('/departments/edit/:id', (req, res) => diagnosistController.editDiagnosis(req, res))
    .post('/departments/update/:id', (req, res) => diagnosistController.updateDiagnosis(req, res))
    .get('/departments/delete/:id', (req, res) => diagnosistController.confirmDeleteDiagnosis(req, res))
    .post('/departments/delete/:id', (req, res) => diagnosistController.deleteDiagnosis(req, res))
    .get('/departments/search', (req, res) => diagnosistController.searchDiagnosis(req, res));


export default diagnosisRouter;