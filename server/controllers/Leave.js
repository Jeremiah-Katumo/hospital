import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {
    getAll,
    post,
    search,
    trash,
    update,
} from '../services/leaveServices.js';
import { validationResult } from 'express-validator';

export const getLeaveList = (req, res) => {
    getAll((err, result) => {
        if (err) {
            res.status(404).json({ error: 'No employers on leave!'})
        }

        res.render('leave/leave.ejs', {list: result});
    })
}

export const addLeave = (req, res) => {
    res.render('leave/add.ejs');
}

export const postLeave = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation failed', 422, errors.array());
    }

    var {
        first_name, last_name, employee_id, leave_type, date_from, date_to, reason
    } = req.body;

    post(first_name, last_name, employee_id, leave_type, date_from, date_to, reason, (err) => {
        if (err) {
            res.status(404).json({ error: 'An error occured while posting Leave'})
        }

        res.status(201).json({ message: `Leave added successfuly!` });
    })
}

export const editLeave = (req, res) => {
    res.render('leave/edit.ejs');
}

export const updateLeave = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation failed', 422, errors.array());
    }

    var {
        id, first_name, last_name, employee_id, leave_type, date_from, date_to, reason
    } = req.body;

    update(id, first_name, last_name, employee_id, leave_type, date_from, date_to, reason, (err) => {
        if (err) {
            res.status(404).json({ error: `Leave with id ${id} does not exist!`});
        }
    })

    res.status(201).json({ message: 'Leave updated'})
}

export const confirmDeleteLeave = (req, res) => {
    res.render('templates/confirm_delete.js');
}

export const deleteLeave = (req, res) => {
    var id = req.params.id;

    trash(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while deleting the leave' });
        }
        res.render('/leave/list.ejs', { list: result });
    })
}

export const searchLeave = (req, res) => {
    var key = req.body.search;

    search(key, function (err, result) {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while searching the leave' });
        }
        res.render('/leave/list.ejs', { list: result });
    })
}