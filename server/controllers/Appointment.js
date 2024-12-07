export class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }

    async getAppointmentList(req, res) {
        try {
            const appointments = await this.appointmentService.getAll();
            res.render('appointment/list.ejs', { list: appointments });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching appointment: '+err.message });
        }
    }

    async getAppointmentById(req, res) {
        try {
            const id = req.params.id;
            const appointment = await this.appointmentService.getOne(id);
            res.render('appointment/view.ejs', { list: appointment });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching appointment: '+err.message });
        }
    }

    async addAppointment(req, res) {
        res.render('appointment/add.ejs');
    }

    async postAppointment(req, res) {
        try {
            await this.appointmentService.post(req.body);
            res.redirect('/appointments');
        } catch (err) {
            res.status(500).json({ error: 'Error adding appointment: '+err.message });
        }
    }

    async editAppointment(req, res) {
        try {
            const id = req.params.id;
            const appointment = await this.appointmentService.getOne(id);
            res.render('appointment/edit.ejs', { list: appointment });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching appointment: '+err.message});
        }
    }

    async updateAppointment(req, res) {
        try {
            await this.appointmentService.update({ ...req.body, id: req.params.id });
            res.redirect('/appointments');
        } catch (err) {
            res.status(500).json({ error: 'Error updating appointment: ' +err.message });
        }
    }

    async confirmDeleteAppointment(req, res) {
        try {
            const id = req.params.id;
            const appointment = await this.appointmentService.getOne(id);
            res.render('templates/confirm_delete.ejs', { list: appointment });
        } catch (err) {
            res.status(500).json({ error: 'Error fetching appointment: '+err.message});
        }
    }

    async deleteAppointment(req, res) {
        try {
            await this.appointmentService.delete(req.params.id);
            res.redirect('/appointmentS');
        } catch (err) {
            res.status(500).json({ error: 'Error deleting appointment: '+err.message });
        }
    }

    async searchAppointment(req, res) {
        try {
            const appointments = await this.appointmentService.search(req.query.search);
            res.render('appointment/list.ejs', { list: appointments });
        } catch (err) {
            res.status(500).json({ error: 'Error searching for appointments: ' +err.message });
        }
    }
}
