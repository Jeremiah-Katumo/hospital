import express from 'express';
import injector from '../injectors/injector.js';
import { EmployerController } from '../controllers/Employer.js';


const employerService = injector.get('EmployerService');
const employerController = new EmployerController(employerService);

employerRouter = express.Router();

employerRouter.get('/employers', (req, res) => employerController.getEmployerList(req, res))
    .get('/employers/:id', (req, res) => employerController.getEmployerById(req, res))
    .get('/employers/add', (req, res) => employerController.addEmployer(req, res))
    .post('/employers/save', (req, res) => employerController.postEmployer(req, res))
    .get('/employers/edit/:id', (req, res) => employerController.editEmployer(req, res))
    .post('/employers/update/:id', (req, res) => employerController.updateEmployer(req, res))
    .get('/employers/delete/:id', (req, res) => employerController.confirmDeleteEmployer(req, res))
    .post('/employers/delete/:id', (req, res) => employerController.deleteEmployer(req, res))
    .get('/employers/search', (req, res) => employerController.searchEmployer(req, res));


export default employerRouter;