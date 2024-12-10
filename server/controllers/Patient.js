import multer from 'multer';

export class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }

    getPatient = (req, res, next) => {
        const username = req.cookies.username;
        if (!username) {
            return res.redirect('/login');
        }
        next();
    }

    // Set up multer storage
    storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "public/assets/images/upload_images");
        },
        filename: function(req, file, callback) {
            console.log(file);
            callback(null, file.originalname);
        }
    });

    upload = multer({ storage: this.storage });

    getPatientById = (req, res) => {
        const id = req.params.id;
        this.patientService.getOne(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while fetching the patient' });
            }
            res.render('patient/view.ejs');
        });
    }

    getPatientList = (req, res) => {
        this.patientService.getAll((err, result) => {
            if (err) {
                res.status(500).json({ error: 'An error occurred while fetching the patients' });
            }
            res.render('patient/list.ejs', { list: result });
        });
    }

    addPatient = (req, res) => {
        res.render('patient/add.ejs');
    }

    postPatient = (req, res) => {
        const { first_name, last_name, gender, doctor_id, patient_number, diagnosis, location, date_of_birth } = req.body;
        this.patientService.post(first_name, last_name, gender, doctor_id, patient_number, diagnosis, location, date_of_birth, (err) => {
            if (err) {
                res.status(404).json({ error: 'An error occurred while adding patient' });
            }
            res.status(201).json({ message: 'Patient added successfully' });
        });
    }

    editPatient = (req, res) => {
        const id = req.params.id;
        this.patientService.getOne(id, (err, result) => {
            if (err) {
                res.status(404).json({ error: 'Patient not found.' });
            }
            res.render('patient/edit.ejs', { patient: result });
        });
    }

    updatePatient = (req, res) => {
        const { id, first_name, last_name, gender, doctor_id, patient_number, diagnosis, location, date_of_birth } = req.body;
        this.patientService.update(id, first_name, last_name, gender, doctor_id, patient_number, diagnosis, location, date_of_birth, (err) => {
            if (err) {
                res.status(404).json({ error: 'Patient already exists' });
            }
            res.render('patient/view.ejs');
        });
    }

    confirmDeletePatient = (req, res) => {
        const id = req.params.id;
        this.patientService.getOne(id, (err, request) => {
            if (err) {
                res.status(404).json({ error: 'Patient not found' });
            }
            res.render('templates/confirm_delete.ejs');
        });
    }

    deletePatient = (req, res) => {
        const id = req.params.id;
        this.patientService.trash(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while deleting the patient' });
            }
            res.send('Patient deleted successfully');
        });
    }

    restorPatient = (req, res) => {
        const id = req.params.id;
        this.patientService.restore(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'An error occurred while restoring the patient' });
            }
            res.send('Patient restored successfully');
        });
    };

    searchPatient = (req, res) => {
        const key = req.params.id; // Assuming `id` is a search key
        this.patientService.search(key, (err, result) => {
            if (err) {
                res.status(500).json({ message: 'An error occurred while searching patients' });
            }
            res.render('patient/list.ejs', { list: result });
        });
    }
}
