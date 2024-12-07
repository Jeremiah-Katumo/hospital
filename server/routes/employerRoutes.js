import express from 'express';
import injector from '../injectors/injector.js';
import { EmployerController } from '../controllers/Employer.js';


const employerService = injector.get('EmployerService');
const employerController = new EmployerController(employerService);

const employerRouter = express.Router();

employerRouter.get('/employers', (req, res) => employerController.getEmployerList(req, res))
    .get('/employers/:id', (req, res) => employerController.getEmployerById(req, res))
    .get('/employers/add', (req, res) => employerController.addEmployer(req, res))
    .post('/employers', (req, res) => employerController.postEmployer(req, res))
    .get('/employers/:id/edit', (req, res) => employerController.editEmployer(req, res))
    .put('/employers/:id', (req, res) => employerController.updateEmployer(req, res))
    .get('/employers/:id/confirm_delete', (req, res) => employerController.confirmDeleteEmployer(req, res))
    .post('/employers/:id', (req, res) => employerController.deleteEmployer(req, res))
    .get('/employers/search', (req, res) => employerController.searchEmployer(req, res));


export default employerRouter;