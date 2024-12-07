import express from 'express';
import injector from '../injectors/injector.js';
import { DepartmentController } from '../controllers/Department.js';


const departmentService = injector.get('DepartmentService');
const departmentController = new DepartmentController(departmentService);

complainRouter = express.Router();

complainRouter.get('/departments', (req, res) => departmentController.getDepartmentList(req, res))
    .get('/departments/:id', (req, res) => departmentController.getDepartmentById(req, res))
    .get('/departments/add', (req, res) => departmentController.addDepartment(req, res))
    .post('/departments/save', (req, res) => departmentController.postDepartment(req, res))
    .get('/departments/edit/:id', (req, res) => departmentController.editDepartment(req, res))
    .post('/departments/update/:id', (req, res) => departmentController.updateDepartment(req, res))
    .get('/departments/delete/:id', (req, res) => departmentController.confirmDeleteDepartment(req, res))
    .post('/departments/delete/:id', (req, res) => departmentController.deleteDepartment(req, res))
    .get('/departments/search', (req, res) => departmentController.searchDepartment(req, res));


export default complainRouter;