export class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }

    async getEmployeeList(req, res) {
        try {
            const employees = await this.employeeService.getAll();
            res.render('employee/list.ejs', { list: employees });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employee: '+err.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const id = req.params.id;
            const employee = await this.employeeService.getOne(id);
            res.render('employee/view.ejs', { list: employee });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employee: '+err.message });
        }
    }

    async addEmployee(req, res) {
        res.render('employee/add.ejs');
    }

    async postEmployee(req, res) {
        try {
            await this.employeeService.post(req.body);
            res.redirect('/employees');
        } catch (err) {
            res.status(500).json({ error: 'Error adding employee: '+err.message });
        }
    }

    async editEmployee(req, res) {
        try {
            const id = req.params.id;
            const employee = await this.employeeService.getOne(id);
            res.render('employee/edit.ejs', { list: employee });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employee: '+err.message});
        }
    }

    async updateEmployee(req, res) {
        try {
            await this.employeeService.update({ ...req.body, id: req.params.id });
            res.redirect('/employee');
        } catch (err) {
            res.status(500).json({ error: 'Error updating employee: ' +err.message });
        }
    }

    async confirmDeleteEmployee(req, res) {
        try {
            const id = req.params.id;
            const employee = await this.employeeService.getOne(id);
            res.render('templates/confirm_delete.ejs', { employee });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching employee: '+err.message});
        }
    }

    async deleteEmployee(req, res) {
        try {
            await this.employeeService.delete(req.params.id);
            res.redirect('/employers');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting employer: '+err.message });
        }
    }

    async searchEmployee(req, res) {
        try {
            const employees = await this.employeeService.search(req.query.search);
            res.render('employee/list.ejs', { list: employees });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for employees: ' +err.message });
        }
    }
}
