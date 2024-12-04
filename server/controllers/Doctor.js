import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAll, getOne, add, update, search } from '../services/doctorServices.js';


export const getDoctor = (req, res, next) => {
    if (req.cookies[username] === null) {
        res.redirect('/login');
    } else {
        next();
    }
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
    if (err) throw err;

    res.render('doctor/list.ejs', {list: result});
}

export const addDoctor = (req, res) => {
    getAll(function(err, result) {
        if (err) throw err;
        
        res.render('doctor/add.ejs', {list: result});
    })
}

export const postDoctor = (req, res) => {
    var { 
        first_name, last_name, email, dob, gender, address, phone, filename, department, biography 
    } = req.body;

    var add_doctor = add(
        first_name, last_name, email, dob, gender, address, phone, filename, department, biography 
    )
    if (add_doctor) {
        console.log("1 doctor added successfuly!");
    }

    res.render('/doctor/list.ejs');
}

export const editDoctor = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
        res.render('/doctor/edit.ejs', {list: result});
    })
}

export const updateDoctor = (req, res) => {
    var id = req.params.id;
    var { 
        first_name, last_name, email, dob, gender, address, phone, department, biography 
    } = req.body;

    update(first_name, last_name, email, dob, gender, address, phone, department, biography, function(err, result) {
        if (err) throw err;
        res.redirect('/doctor/list.ejs', {list: result});
    })
}

export const confirmDeleteDoctor = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
        res.render('/doctor/delete.ejs', {list: result});
    })
}

export const deleteDoctor = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
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