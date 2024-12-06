import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAll, getOne, post, update, search, trash } from '../services/doctorServices.js';


export const getDoctor = (req, res, next) => {
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

export const getDoctorById = (req, res) => {
    const id = req.params.id;
    getOne(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the doctor' });
        }
        res.render('doctor/view.ejs', { list: result });
    });
}

export const getDoctorList = (req, res) => {
    getAll((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching doctors' });
        }
        res.render('doctor/list.ejs', { list: result });
    });
}

export const addDoctor = (req, res) => {
    res.render('doctor/add.ejs');
}

export const postDoctor = (req, res) => {
    const { first_name, last_name, email, phone, dob, gender, address, department, biography } = req.body;
    post(first_name, last_name, email, phone, dob, gender, address, department, biography, (err) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while adding the doctor' });
        }
        res.status(200).json({ message: 'Doctor added successfully!' });
    });
};

export const editDoctor = (req, res) => {
    const id = req.params.id;
    getOne(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the doctor' });
        }
        res.render('doctor/edit.ejs', { list: result });
    });
}

export const updateDoctor = (req, res) => {
    const { id, first_name, last_name, email, dob, gender, address, phone, department, biography } = req.body;
    update(id, first_name, last_name, email, dob, gender, address, phone, department, biography, (err) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while updating the doctor' });
        }
        res.status(200).json({ message: 'Doctor updated successfully!' });
    });
}

export const confirmDeleteDoctor = (req, res) => {
    const id = req.params.id;
    getOne(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the doctor' });
        }
        res.render('templates/confirm_delete.ejs');
    });
}

export const deleteDoctor = (req, res) => {
    const id = req.params.id;
    trash(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while deleting the doctor' });
        }
        res.redirect('/doctor/list');
    });
}

export const searchDoctor = (req, res) => {
    const key = req.body.search;
    search(key, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while searching for doctors' });
        }
        res.render('doctor/list.ejs', { list: result });
    });
}