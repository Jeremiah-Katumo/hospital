import express from 'express';
import injector from '../injectors/injector.js';
import { DashboardController } from '../controllers/Dashboard.js';
import { isAuthenticated } from '../helpers/jwtHelper.js';


// const dashboardService = injector.get('DashboardService');
const dashboardController = new DashboardController();

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboards', isAuthenticated, (req, res) => dashboardController.getDashboardList(req, res));

export default dashboardRouter;