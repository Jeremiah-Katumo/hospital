import express from 'express';
import injector from '../injectors/injector.js';
import { DashboardController } from '../controllers/Dashboard.js';


// const dashboardService = injector.get('DashboardService');
const dashboardController = new DashboardController();

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboards', (req, res) => dashboardController.renderDashboardPage(req, res));

export default dashboardRouter;