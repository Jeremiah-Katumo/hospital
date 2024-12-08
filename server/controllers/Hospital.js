export class HospitalController {
    constructor(hospitalService) {
        this.hospitalService = hospitalService;
    }

    async getHospitalList(req, res) {
        try {
            const hospitals = await this.hospitalService.getAll();
            res.render('hospital/list.ejs', { list: hospitals });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching hospitals: ' + err.message });
        }
    }

    async getHospitalById(req, res) {
        try {
            const id = req.params.id;
            const hospitals = await this.hospitalService.getOne(id);
            res.render('hospital/view.ejs', { list: hospital });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching hospital: ' + err.message });
        }
    }

    async addHospital(req, res) {
        res.render('hospital/add.ejs');
    }

    async postHospital(req, res) {
        try {
            await this.hospitalService.post(req.body);
            res.redirect('/hospitals');
        } catch (err) {
            res.status(500).json({ error: 'Error adding hospital: ' + err.message });
        }
    }

    async editHospital(req, res) {
        try {
            const id = req.params.id;
            const doctor = await this.hospitalService.getOne(id);
            res.render('hospital/edit.ejs', { list: doctor });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching hospital: ' + err.message });
        }
    }

    async updateHospital(req, res) {
        try {
            await this.hospitalService.update({ ...req.body, id: req.params.id });
            res.redirect('/hospitals');
        } catch (err) {
            res.status(500).json({ error: 'Error updating hospital: ' + err.message });
        }
    }

    async confirmDeleteHospital(req, res) {
        try {
            const id = req.params.id;
            const hospital = await this.hospitalService.getOne(id);
            res.render('templates/confirm_delete.ejs', { hospital });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching hospital: ' + err.message });
        }
    }

    async deleteHospital(req, res) {
        try {
            await this.hospitalService.delete(req.params.id);
            res.redirect('/hospitals');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting hospital: ' + err.message });
        }
    }

    async searchDoctor(req, res) {
        try {
            const hospitals = await this.hospitalService.search(req.query.search);
            res.render('hospital/list.ejs', { list: hospitals });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for hospitals: ' + err.message });
        }
    }
}
