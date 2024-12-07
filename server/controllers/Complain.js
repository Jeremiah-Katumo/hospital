export class ComplainController {
    constructor(complainService) {
        this.complainService = complainService;
    }

    async getComplainList(req, res) {
        try {
            const complains = await this.complainService.getAll();
            res.render('complain/list.ejs', { list: complains });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching complains: ' + err.message });
        }
    }

    async getComplainById(req, res) {
        try {
            const id = req.params.id;
            const complain = await this.complainService.getOne(id);
            res.render('complain/view.ejs', { list: complain });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching complain: ' + err.message });
        }
    }

    async addComplain(req, res) {
        res.render('complain/add.ejs');
    }

    async postComplain(req, res) {
        try {
            await this.complainService.post(req.body);
            res.redirect('/complains');
        } catch (err) {
            res.status(500).json({ error: 'Error adding complain: ' + err.message });
        }
    }

    async editComplain(req, res) {
        try {
            const id = req.params.id;
            const complain = await this.complainService.getOne(id);
            res.render('complain/edit.ejs', { list: complain });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching complain: ' + err.message });
        }
    }

    async updateComplain(req, res) {
        try {
            await this.complainService.update({ ...req.body, id: req.params.id });
            res.redirect('/complains');
        } catch (err) {
            res.status(500).json({ error: 'Error updating complain: ' + err.message });
        }
    }

    async confirmDeleteComplain(req, res) {
        try {
            const id = req.params.id;
            const complain = await this.complainService.getOne(id);
            res.render('templates/confirm_delete.ejs', { complain });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching complain: ' + err.message });
        }
    }

    async deleteComplain(req, res) {
        try {
            await this.complainService.delete(req.params.id);
            res.redirect('/complains');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting complain: ' + err.message });
        }
    }

    async searchComplain(req, res) {
        try {
            const complains = await this.complainService.search(req.query.search);
            res.render('complain/list.ejs', { list: complains });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for complains: ' + err.message });
        }
    }
}
