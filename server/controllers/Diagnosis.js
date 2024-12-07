export class DiagnosisController {
    constructor(diagnosisService) {
        this.diagnosisService = diagnosisService;
    }

    async getDiagnosisList(req, res) {
        try {
            const diagnosises = await this.diagnosisService.getAll();
            res.render('diagnosis/list.ejs', { list: diagnosises });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching diagnosises: ' + err.message });
        }
    }

    async getDiagnosisById(req, res) {
        try {
            const id = req.params.id;
            const diagnosis = await this.diagnosisService.getOne(id);
            res.render('diagnosis/view.ejs', { list: diagnosis });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching diagnosis: ' + err.message });
        }
    }

    async addDiagnosis(req, res) {
        res.render('diagnosis/add.ejs');
    }

    async postDiagnosis(req, res) {
        try {
            await this.diagnosisService.post(req.body);
            res.redirect('/diagnosises');
        } catch (err) {
            res.status(500).json({ error: 'Error adding diagnosis: ' + err.message });
        }
    }

    async editDiagnosis(req, res) {
        try {
            const id = req.params.id;
            const diagnosis = await this.diagnosisService.getOne(id);
            res.render('diagnosis/edit.ejs', { list: diagnosis });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching diagnosis: ' + err.message });
        }
    }

    async updateDiagnosis(req, res) {
        try {
            await this.diagnosisService.update({ ...req.body, id: req.params.id });
            res.redirect('/diagnosises');
        } catch (err) {
            res.status(500).json({ error: 'Error updating diagnosis: ' + err.message });
        }
    }

    async confirmDeleteDiagnosis(req, res) {
        try {
            const id = req.params.id;
            const diagnosis = await this.diagnosisService.getOne(id);
            res.render('templates/confirm_delete.ejs', { complain: diagnosis });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching diagnosis: ' + err.message });
        }
    }

    async deleteDiagnosis(req, res) {
        try {
            await this.diagnosisService.delete(req.params.id);
            res.redirect('/diagnosises');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting diagnosis: ' + err.message });
        }
    }

    async searchDiagnosis(req, res) {
        try {
            const diagnosises = await this.diagnosisService.search(req.query.search);
            res.render('diagnosis/list.ejs', { list: diagnosises });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for diagnosises: ' + err.message });
        }
    }
}
