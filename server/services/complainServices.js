export class ComplainService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll() {
        const query = "SELECT * FROM complain LIMIT 10";
        try {
            const [rows] = await this.promiseConn.query(query);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async getOne(id) {
        const query = "SELECT * FROM complain WHERE id = "+id;
        
        try {
            const [rows] = await this.promiseConn.query(query, [id]);
            return rows[0];
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async post(complain) {
        const query =  `
            INSERT INTO complain (name,email,join_date,role,salary,phone,department) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            complain.name, 
            complain.email, 
            complain.phone, 
            complain.join_date, 
            complain.role, 
            complain.salary, 
            complain.department
        ];

        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async update(complain) {
        const query = `
            UPDATE doctor 
            SET 
                message = ?, name = ?, email = ?, subject = ?, user_type = ?, 
                doctor_id = ?, patient_id = ?, employer_id = ? 
            WHERE id = ?
        `;
        const params = [
            complain.message,
            complain.name, 
            complain.email, 
            complain.subject, 
            complain.user_type, 
            complain.doctor_id, 
            complain.patient_id, 
            complain.employer_id,
            complain.id
        ];

        try {
            const [request] = await this.promiseConn.query(query, params);
            return request;
        } catch (err) {
            throw new Error('Database Error: '+err.message);
        }
    }

    async delete(id) {
        const query = "DELETE complain WHERE id = ?";

        try {
            const [result] = await this.promiseConn.query(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async search(key) {
        const query = "SELECT * FROM complain WHERE name = ?";

        try {
            const [rows] = await this.promiseConn.query(query, [`%${key}%`]);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }
}