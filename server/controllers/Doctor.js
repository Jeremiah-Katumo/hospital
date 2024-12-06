export class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }

    async getDoctorList(req, res) {
        try {
            const doctors = await this.doctorService.getAll();
            res.render('doctor/list.ejs', { list: doctors });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching doctors: ' + err.message });
        }
    }

    async getDoctorById(req, res) {
        try {
            const id = req.params.id;
            const doctor = await this.doctorService.getOne(id);
            res.render('doctor/view.ejs', { list: doctor });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching doctor: ' + err.message });
        }
    }

    async addDoctor(req, res) {
        res.render('doctor/add.ejs');
    }

    async postDoctor(req, res) {
        try {
            await this.doctorService.post(req.body);
            res.redirect('/doctors');
        } catch (err) {
            res.status(500).json({ error: 'Error adding doctor: ' + err.message });
        }
    }

    async editDoctor(req, res) {
        try {
            const id = req.params.id;
            const doctor = await this.doctorService.getOne(id);
            res.render('doctor/edit.ejs', { list: doctor });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching doctor: ' + err.message });
        }
    }

    async updateDoctor(req, res) {
        try {
            await this.doctorService.update({ ...req.body, id: req.params.id });
            res.redirect('/doctors');
        } catch (err) {
            res.status(500).json({ error: 'Error updating doctor: ' + err.message });
        }
    }

    async confirmDeleteDoctor(req, res) {
        try {
            const id = req.params.id;
            const doctor = await this.doctorService.getOne(id);
            res.render('templates/confirm_delete.ejs', { doctor });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching doctor: ' + err.message });
        }
    }

    async deleteDoctor(req, res) {
        try {
            await this.doctorService.delete(req.params.id);
            res.redirect('/doctors');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting doctor: ' + err.message });
        }
    }

    async searchDoctor(req, res) {
        try {
            const doctors = await this.doctorService.search(req.query.search);
            res.render('doctor/list.ejs', { list: doctors });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for doctors: ' + err.message });
        }
    }
}
