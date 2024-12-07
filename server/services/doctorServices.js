export class DoctorService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll() {
        const query = 'SELECT * FROM doctor LIMIT 10';
        try {
            const [rows] = await this.promiseConn.query(query);
            return rows;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async getOne(id) {
        const query = 'SELECT * FROM doctor WHERE id = ?';
        try {
            const [rows] = await this.promiseConn.query(query, [id]);
            return rows[0];
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async post(doctor) {
        const query = `
            INSERT INTO doctor (first_name, last_name, email, phone, dob, gender, address, department, biography) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            doctor.first_name,
            doctor.last_name,
            doctor.email,
            doctor.phone,
            doctor.dob,
            doctor.gender,
            doctor.address,
            doctor.department_id,
            doctor.biography,
        ];
        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async update(doctor) {
        const query = `
            UPDATE doctor 
            SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, department = ?, biography = ? 
            WHERE id = ?
        `;
        const params = [
            doctor.first_name,
            doctor.last_name,
            doctor.email,
            doctor.phone,
            doctor.dob,
            doctor.gender,
            doctor.address,
            doctor.department_id,
            doctor.biography,
            doctor.id,
        ];
        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async delete(id) {
        const query = 'DELETE FROM doctor WHERE id = ?';
        try {
            const [result] = await this.promiseConn.query(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async search(key) {
        const query = 'SELECT * FROM doctor WHERE first_name LIKE ?';
        try {
            const [rows] = await this.promiseConn.query(query, [`%${key}%`]);
            return rows;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }
}
