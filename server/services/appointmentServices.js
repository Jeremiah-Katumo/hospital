export class AppointmentService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll() {
        const query = "SELECT * FROM appointment LIMIT 10";
        try {
            const [rows] = await this.promiseConn.query(query);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async getOne(id) {
        const query = "SELECT * FROM appointment WHERE id = "+id;
        
        try {
            const [rows] = await this.promiseConn.query(query, [id]);
            return rows[0];
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async post(appointment) {
        const query =  `
            INSERT INTO appointment 
            (name,doctor_id,patient_id,department_id,appointment_date,appointment_time,patient_email,patient_phone) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            appointment.name,
            appointment.doctor_id, 
            appointment.patient_id, 
            appointment.department_id, 
            appointment.appointment_date, 
            appointment.appointment_time, 
            appointment.patient_email,
            appointment.patient_phone
        ];

        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async update(appointment) {
        const query = `
            UPDATE appointment 
            SET 
                name = ?, doctor_id = ?, patient_id = ?, department_id = ?, appointment_date = ?, 
                appointment_time = ?, patient_email = ?,, patient_phone = ? 
            WHERE id = ?
        `;
        const params = [
            appointment.name,
            appointment.doctor_id, 
            appointment.patient_id, 
            appointment.department_id, 
            appointment.appointment_date, 
            appointment.appointment_time, 
            appointment.patient_email,
            appointment.patient_phone,
            appointment.id
        ];

        try {
            const [request] = await this.promiseConn.query(query, params);
            return request;
        } catch (err) {
            throw new Error('Database Error: '+err.message);
        }
    }

    async delete(id) {
        const query = "DELETE appointment WHERE id = ?";

        try {
            const [result] = await this.promiseConn.query(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async search(key) {
        const query = "SELECT * FROM appointment WHERE name = ?";

        try {
            const [rows] = await this.promiseConn.query(query, [`%${key}%`]);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }
}