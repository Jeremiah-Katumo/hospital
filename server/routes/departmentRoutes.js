import express from 'express';
import injector from '../injectors/injector.js';
import { DepartmentController } from '../controllers/Department.js';


const departmentService = injector.get('DepartmentService');
const departmentController = new DepartmentController(departmentService);

const departmentRouter = express.Router();

departmentRouter.get('/departments', (req, res) => departmentController.getDepartmentList(req, res))
    .get('/departments/:id', (req, res) => departmentController.getDepartmentById(req, res))
    .get('/departments/add', (req, res) => departmentController.addDepartment(req, res))
    .post('/departments', (req, res) => departmentController.postDepartment(req, res))
    .get('/departments/:id/edit', (req, res) => departmentController.editDepartment(req, res))
    .put('/departments/:id', (req, res) => departmentController.updateDepartment(req, res))
    .get('/departments/:id/confirm_delete', (req, res) => departmentController.confirmDeleteDepartment(req, res))
    .post('/departments/:id', (req, res) => departmentController.deleteDepartment(req, res))
    .get('/departments/search/:id', (req, res) => departmentController.searchDepartment(req, res));


export default departmentRouter;