import express from 'express';
import injector from '../injectors/injector.js';
import LeaveController from '../controllers/LeaveController.js';

// Retrieve the LeaveService instance
const leaveService = injector.get('LeaveService');
// Initialize the LeaveController with the service
const leaveController = new LeaveController(leaveService);

// Create a router for leave operations
const leaveRouter = express.Router();

// Define routes for leave operations
leaveRouter
    .get('/leaves', (req, res) => leaveController.getLeaveList(req, res))
    .get('/leaves/add', (req, res) => leaveController.addLeave(req, res))
    .post('/leaves', (req, res) => leaveController.postLeave(req, res))
    .get('/leaves/edit/:id', (req, res) => leaveController.editLeave(req, res))
    .put('/leaves/:id', (req, res) => leaveController.updateLeave(req, res))
    .get('/leaves/confirm-delete/:id', (req, res) => leaveController.confirmDeleteLeave(req, res))
    .delete('/leaves/:id', (req, res) => leaveController.deleteLeave(req, res))
    .post('/leaves/search', (req, res) => leaveController.searchLeave(req, res));

export default leaveRouter;
