import express from 'express';
import injector from '../injectors/injector.js';
import { ComplainController } from '../controllers/Complain.js';


const complainService = injector.get('ComplainService');
const complainController = new ComplainController(complainService);

complainRouter = express.Router();

complainRouter.get('/complains', (req, res) => complainController.getComplainList(req, res))
    .get('/complains/:id', (req, res) => complainController.getComplainById(req, res))
    .get('/complains/add', (req, res) => complainController.addComplain(req, res))
    .post('/complains/save', (req, res) => complainController.postComplain(req, res))
    .get('/complains/edit/:id', (req, res) => complainController.editComplain(req, res))
    .post('/complains/update/:id', (req, res) => complainController.updateComplain(req, res))
    .get('/complains/delete/:id', (req, res) => complainController.confirmDeleteComplain(req, res))
    .post('/complains/delete/:id', (req, res) => complainController.deleteComplain(req, res))
    .get('/complains/search', (req, res) => complainController.searchComplain(req, res));


export default complainRouter;