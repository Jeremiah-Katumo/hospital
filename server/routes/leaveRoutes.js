import express from 'express';
import injector from '../injectors/injector.js';
import LeaveController from '../controllers/Leave.js';

const leaveService = injector.get('LeaveService');
const leaveController = new LeaveController(leaveService);

const leaveRouter = express.Router();

leaveRouter
    .get('/leaves', (req, res) => leaveController.getLeaveList(req, res))
    .get('/leaves/add', (req, res) => leaveController.addLeave(req, res))
    .post('/leaves', (req, res) => leaveController.postLeave(req, res))
    .get('/leaves/:id/edit', (req, res) => leaveController.editLeave(req, res))
    .put('/leaves/:id', (req, res) => leaveController.updateLeave(req, res))
    .get('/leaves/:id/confirm_delete', (req, res) => leaveController.confirmDeleteLeave(req, res))
    .post('/leaves/:id', (req, res) => leaveController.deleteLeave(req, res))
    .post('/leaves/search', (req, res) => leaveController.searchLeave(req, res));

export default leaveRouter;
