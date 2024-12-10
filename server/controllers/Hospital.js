export class HospitalController {
    constructor(hospitalService) {
        this.hospitalService = hospitalService;
    }

    async getHospitalList(req, res) {
        res.render('hospital/list.ejs')
    }

    async fetchHospitals(req, res) {
        try {
            if (req.xhr) {
                // Extract DataTables parameters
                const draw = req.body.draw || 1;
                const start = parseInt(req.body.start) || 0;
                const length = parseInt(req.body.length) || 10;
                const searchValue = req.body.search.value || '';

                // Fetch data from the service
                // const totalRecords = await hospitalService.getTotalCount();
                const { hospitals, totalRecords, totalFiltered } = await hospitalService.fetch(start, length, searchValue);

                // Send the response in DataTables-compatible format
                res.json({
                    draw: draw, // Optional, for DataTables
                    recordsTotal: totalRecords,
                    recordsFiltered: totalFiltered,
                    data: hospitals
                });
            } else {
                // Render the page if not an AJAX call
                res.render('hospital/list.ejs');
            }
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
