import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAll, getOne, post, update, search, trash } from '../services/patientServices.js';


export const getPatient = (req, res, next) => {
    const username = req.cookies.username;
    if (!username) {
        return res.redirect('/login');
    }

    next();
}

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "public/assets/images/upload_images");
    },
    filename: function(req, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
})

export var upload = multer({ storage: storage });

export const getPatientById = (req, res) => {
    var id = req.params.id;
    getOne(id, function(err, result) {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the patient' });
        }

        res.render('/patient/view.ejs');
    })
}

export const getPatientList = (req, res) => {
    getAll((err, result) => {
        if (err) {
            res.status(500).json({ error: 'An  error occurred while fetching the patients'});
        }

        res.render('patient/list.ejs', {list: result});
    })
}

export const addPatient = (req, res) => {
    res.render('patient/add.ejs');
}

export const postPatient = (req, res) => {
    const { 
        first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth 
    } = req.body;

    post(first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth, (err) => {
        if (err) {
            res.status(404).json({ error: 'An error occured while adding patient' });
        }
        res.status(201).json({ message: 'Patient added successfuly' });
    })
}

export const editPatient = (req, res) => {
    const id = req.params.id;
    getOne(id, (err, result) => {
        if (err) {
            res.status(404).json({ error: 'Patient not found.'})
        }
        res.render('employer/edit.ejs')
    })
}

export const updatePatient = (req, res) => {
    const { 
        id, first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth 
    } = req.body;
    update(id, first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth, (err) => {
        if (err) {
            res.status(404).json({ error: 'Patient already exists' });
        }

        res.render('employer/view.ejs');
    })
}

export const confirmDeletePatient = (req, res) => {
    var id = req.params.id;
    getOne(id, (err, request) => {
        if (err) {
            res.status(404).json({ error: 'Patient not found'})
        }
        res.render('templates/confirm_delete.ejs');
    })
}

export const deletePatient = (req, res) => {
    var id = req.params.id;
    trash(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while deleting the patient' });
        }
        res.send('Patient deleted successfuly');
    })
}

export const searchPatient = (req, res) => {
    var id = req.params.id;
    search(id, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'An error occured while searching patients'})
        }
        res.render('patient/list.ejs', {list: result});
    })
}