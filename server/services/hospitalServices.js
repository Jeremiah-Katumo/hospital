export class HospitalService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll() {
        const query = 'SELECT * FROM hospital LIMIT 10';
        try {
            const [rows] = await this.promiseConn.query(query);
            return rows;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async getOne(id) {
        const query = 'SELECT * FROM hospital WHERE id = ?';
        try {
            const [rows] = await this.promiseConn.query(query, [id]);
            return rows[0];
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async post(hospital) {
        const query = `
            INSERT INTO hospital (name, email, location, description, phone) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const params = [
            hospital.name,
            hospital.email,
            hospital.location,
            hospital.description,
            hospital.phone,
        ];
        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async update(hospital) {
        const query = `
            UPDATE hospital 
            SET name = ?, email = ?, location = ?, description = ?, phone = ?
            WHERE id = ?
        `;
        const params = [
            hospital.name,
            hospital.email,
            hospital.location,
            hospital.description,
            hospital.phone,
            hospital.id
        ];
        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async delete(id) {
        const query = 'DELETE FROM hospital WHERE id = ?';
        try {
            const [result] = await this.promiseConn.query(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }

    async search(key) {
        const query = 'SELECT * FROM hospital WHERE name LIKE ?';
        try {
            const [rows] = await this.promiseConn.query(query, [`%${key}%`]);
            return rows;
        } catch (err) {
            throw new Error('Database error: ' + err.message);
        }
    }
}
