import express from 'express';
import injector from '../injectors/injector.js';
import { EmployeeController } from '../controllers/Employee.js';


const employeeService = injector.get('EmployeeService');
const employeeController = new EmployeeController(employeeService);

const employeeRouter = express.Router();

employeeRouter.get('/employees', (req, res) => employeeController.getEmployeeList(req, res))
    .get('/employees/:id', (req, res) => employeeController.getEmployeeById(req, res))
    .get('/employees/add', (req, res) => employeeController.addEmployee(req, res))
    .post('/employees', (req, res) => employeeController.postEmployee(req, res))
    .get('/employees/:id/edit', (req, res) => employeeController.editEmployee(req, res))
    .put('/employees/:id', (req, res) => employeeController.updateEmployee(req, res))
    .get('/employees/:id/confirm_delete', (req, res) => employeeController.confirmDeleteEmployee(req, res))
    .post('/employees/:id', (req, res) => employeeController.deleteEmployee(req, res))
    .get('/employees/:id/search', (req, res) => employeeController.searchEmployee(req, res));


export default employeeRouter;