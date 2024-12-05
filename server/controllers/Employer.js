import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAll, getOne, post, search, trash, update } from '../services/doctorServices.js';


export const getEmployer = (req, res, next) => {
    if (res.cookies[username] === null) {
        res.redirect('/login');
    } else {
        next();
    }
}

export const getEmployerById = (req, res) => {
    var id = req.params.id;
    getOne(id, function(err, result) {
        if (err) throw err;

        res.render('employer/view.ejs', {list: result});
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

export const getEmployerList = (req, res) => {
    getAll(function(err, result) {
        if (err) throw err;

        res.render('employer/list.ejs', {list: result});
    })
}

export const addEmployer = (req, res) => {
    if (err) throw err;

    res.render('employer/add.ejs', {list: result});
}

export const postEmployer = (req, res) => {
    var { 
        name, email, phone, join_date, role, salary, department
    } = req.body;

    var add_doctor = post(
        name, email, phone, join_date, role, salary, department
    )
    if (add_doctor) {
        console.log("1 doctor added successfuly!");
    }

    res.render('/employer/list.ejs');
}

export const editEmployer = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
        res.render('/employer/edit.ejs', {list: result});
    })
}

export const updateEmployer = (req, res) => {
    var id = req.params.id;
    var { 
        id, name, email, phone, join_date, role, salary, department
    } = req.body;

    update(id, name, email, phone, join_date, role, salary, department, function(err, result) {
        if (err) throw err;
        res.redirect('/employer/list.ejs', {list: result});
    })
}

export const confirmDeleteEmployer = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
        res.render('/employer/delete.ejs', {list: result});
    })
}

export const deleteEmployer = (req, res) => {
    var id = req.params.id;

    trash(id, function(err, result) {
        res.render('/employer/list.ejs', {list: result});
    })
}

export const searchEmployer = (req, res) => {
    var key = req.body.search;

    search(key, function(err, result) {
        console.log(result);
        res.render('/employer/list.ejs', {list: result});
    })
}