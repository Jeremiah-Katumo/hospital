export class EmployerController {
    constructor(employerService) {
        this.employerService = employerService;
    }

    async getEmployerList(req, res) {
        try {
            const employers = await this.employerService.getAll();
            res.render('employer/list.ejs', { list: employers });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employer: '+err.message });
        }
    }

    async getEmployerById(req, res) {
        try {
            const id = req.params.id;
            const employer = await this.employerService.getOne(id);
            res.render('employer/view.ejs', { list: employer });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employer: '+err.message });
        }
    }

    async addEmployer(req, res) {
        res.render('employer/add.ejs');
    }

    async postEmployer(req, res) {
        try {
            await this.employerService.post(req.body);
            res.redirect('/employers');
        } catch (err) {
            res.status(500).json({ error: 'Error adding employer: '+err.message });
        }
    }

    async editEmployer(req, res) {
        try {
            const id = req.params.id;
            const employer = await this.employerService.getOne(id);
            res.render('employer/edit.ejs', { list: employer });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employer: '+err.message});
        }
    }

    async updateEmployer(req, res) {
        try {
            await this.employerService.update({ ...req.body, id: req.params.id });
            res.redirect('/employers');
        } catch (err) {
            res.status(500).json({ error: 'Error updating employer: ' +err.message });
        }
    }

    async confirmDeleteEmployer(req, res) {
        try {
            const id = req.params.id;
            const employer = await this.employerService.getOne(id);
            res.render('templates/confirm_delete.ejs', { employer });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employer: '+err.message});
        }
    }

    async deleteEmployer(req, res) {
        try {
            await this.employerService.delete(req.params.id);
            res.redirect('/employers');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting employer: '+err.message });
        }
    }

    async searchEmployer(req, res) {
        try {
            const employers = await this.employerService.search(req.query.search);
            res.render('employer/list.ejs', { list: employers });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for employers: ' +err.message });
        }
    }
}
