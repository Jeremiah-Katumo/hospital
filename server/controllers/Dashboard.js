export class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }

    async getDashboardList(req, res) {
        res.render('dashboard/list.ejs');
    }
}