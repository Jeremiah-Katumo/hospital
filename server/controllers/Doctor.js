import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAll, getOne, post, update, search, trash } from '../services/doctorServices.js';


export const getDoctor = (req, res, next) => {
    if (req.cookies[username] === null) {
        res.redirect('/login');
    } else {
        next();
    }
}

export const getDoctorById = (req, res) => {
    var id = req.params.id;
    getOne(id, function(err, result) {
        if (err) throw err;

        res.render('doctor/view.ejs', {list: result});
    })
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

export const getDoctorList = (req, res) => {
    getAll(function(err, result) {
        if (err) throw err;

        res.render('doctor/list.ejs', {list: result});
    })
}

export const addDoctor = (req, res) => {
    if (err) throw err;

    res.render('doctor/add.ejs', {list: result});
}

export const postDoctor = (req, res) => {
    const { first_name, last_name, email, phone, dob, gender, address, department, biography } = req.body;

    post(first_name, last_name, email, phone, dob, gender, address, department, biography );
    res.send('Doctor added successfuly!');
};

export const editDoctor = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
        res.render('/doctor/edit.ejs', {list: result});
    })
}

export const updateDoctor = (req, res) => {
    var id = req.params.id;
    var { 
        id, first_name, last_name, email, dob, gender, address, phone, department, biography 
    } = req.body;

    update(id, first_name, last_name, email, dob, gender, address, phone, department, biography );
    res.send('Doctor updated successfuly!');
}

export const confirmDeleteDoctor = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
        res.render('/doctor/delete.ejs', {list: result});
    })
}

export const deleteDoctor = (req, res) => {
    var id = req.params.id;

    trash(id, function(err, result) {
        res.render('/doctor/list.ejs', {list: result});
    })
}

export const searchDoctor = (req, res) => {
    var key = req.body.search;

    search(key, function(err, result) {
        console.log(result);
        res.render('/doctor/list.ejs', {list: result});
    })
}