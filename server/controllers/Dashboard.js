export class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }

    async renderDashboardPage(req, res) {
        res.render('dashboard/list.njk');
    }
}