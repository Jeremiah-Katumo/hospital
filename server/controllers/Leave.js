import { validationResult } from 'express-validator';

class LeaveController {
    constructor(leaveService) {
        this.leaveService = leaveService;
    }

    async getLeaveList(req, res) {
        try {
            const leaves = await this.leaveService.getAll();
            res.render('leave/leave.ejs', { list: leaves });
        } catch (error) {
            res.status(404).json({ error: 'No employers on leave!' });
        }
    }

    addLeave(req, res) {
        res.render('leave/add.ejs');
    }

    async postLeave(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: 'Validation failed', details: errors.array() });
        }

        const { firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason } = req.body;

        try {
            await this.leaveService.post({ firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason });
            res.status(201).json({ message: 'Leave added successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while posting Leave' });
        }
    }

    editLeave(req, res) {
        res.render('leave/edit.ejs');
    }

    async updateLeave(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: 'Validation failed', details: errors.array() });
        }

        const { id, firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason } = req.body;

        try {
            await this.leaveService.update(id, { firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason });
            res.status(200).json({ message: 'Leave updated successfully!' });
        } catch (error) {
            res.status(404).json({ error: `Leave with id ${id} does not exist!` });
        }
    }

    confirmDeleteLeave(req, res) {
        res.render('templates/confirm_delete.js');
    }

    async deleteLeave(req, res) {
        const { id } = req.params;

        try {
            await this.leaveService.trash(id);
            res.redirect('/leave/list');
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the leave' });
        }
    }

    async searchLeave(req, res) {
        const { search: key } = req.body;

        try {
            const results = await this.leaveService.search(key);
            res.render('/leave/list.ejs', { list: results });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while searching the leave' });
        }
    }
}

export default LeaveController;
