export class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }

    async getDepartmentList(req, res) {
        try {
            const departments = await this.departmentService.getAll();
            res.render('department/list.ejs', { list: departments });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching departments: ' + err.message });
        }
    }

    async getDepartmentById(req, res) {
        try {
            const id = req.params.id;
            const department = await this.departmentService.getOne(id);
            res.render('department/view.ejs', { list: department });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching department: ' + err.message });
        }
    }

    async addDepartment(req, res) {
        res.render('department/add.ejs');
    }

    async postDepartment(req, res) {
        try {
            await this.departmentService.post(req.body);
            res.redirect('/departments');
        } catch (err) {
            res.status(500).json({ error: 'Error adding department: ' + err.message });
        }
    }

    async editDepartment(req, res) {
        try {
            const id = req.params.id;
            const department = await this.departmentService.getOne(id);
            res.render('department/edit.ejs', { list: department });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching department: ' + err.message });
        }
    }

    async updateDepartment(req, res) {
        try {
            await this.departmentService.update({ ...req.body, id: req.params.id });
            res.redirect('/departments');
        } catch (err) {
            res.status(500).json({ error: 'Error updating department: ' + err.message });
        }
    }

    async confirmDeleteDepartment(req, res) {
        try {
            const id = req.params.id;
            const department = await this.departmentService.getOne(id);
            res.render('templates/confirm_delete.ejs', { department });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching department: ' + err.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            await this.departmentService.delete(req.params.id);
            res.redirect('/departments');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting department: ' + err.message });
        }
    }

    async searchDepartment(req, res) {
        try {
            const departments = await this.departmentService.search(req.query.search);
            res.render('department/list.ejs', { list: departments });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for department: ' + err.message });
        }
    }
}
