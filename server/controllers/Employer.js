import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAll, getOne, post, search, trash, update } from '../services/doctorServices.js';


export const getEmployer = (req, res, next) => {
    const username = req.cookies.username;
    if (!username) {
        return res.redirect('/login');
    }
    next();
}

export const getEmployerById = (req, res) => {
    var id = req.params.id;
    getOne(id, function(err, result) {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching doctor' });
        }
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
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching doctors' });
        }
        res.render('employer/list.ejs', {list: result});
    })
}

export const addEmployer = (req, res) => {
    // if (err) throw err;
    res.render('employer/add.ejs', {list: result});
}

export const postEmployer = (req, res) => {
    var { name, email, phone, join_date, role, salary, department } = req.body;

    post(name, email, phone, join_date, role, salary, department, (err) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while adding the doctor' });
        }
        res.status(200).json({ message: 'Doctor added successfully!' });
    });
}

export const editEmployer = (req, res) => {
    var id = req.params.id;

    getOne(id, function(err, result) {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the employer' });
        }
        res.render('employer/edit.ejs', { list: result });
    })
}

export const updateEmployer = (req, res) => {
    // var id = req.params.id;
    var { id, name, email, phone, join_date, role, salary, department } = req.body;

    update(id, name, email, phone, join_date, role, salary, department, function(err, result) {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while updating the employer' });
        }
        res.status(200).json({ message: 'Employer updated successfully!' })
    })
}

export const confirmDeleteEmployer = (req, res) => {
    var id = req.params.id;

    getOne(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the employer' });
        }
        res.render('employer/delete.ejs', { list: result });
    });
}

export const deleteEmployer = (req, res) => {
    var id = req.params.id;
    trash(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while deleting the employer' });
        }
        res.redirect('/employer/list');
    });
}

export const searchEmployer = (req, res) => {
    var key = req.body.search;

    search(key, function(err, result) {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while deleting the employer' });
        }
        res.render('/employer/list.ejs', {list: result});
    })
}