export class DepartmentService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll() {
        const query = "SELECT * FROM diagnosis LIMIT 10";
        try {
            const [rows] = await this.promiseConn.query(query);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async getOne(id) {
        const query = "SELECT * FROM diagnosis WHERE id = "+id;
        
        try {
            const [rows] = await this.promiseConn.query(query, [id]);
            return rows[0];
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async post(diagnosis) {
        const query =  `
            INSERT INTO diagnosis (name) 
            VALUES (?, ?)
        `;
        const params = [
            diagnosis.name,
        ];

        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async update(diagnosis) {
        const query = `
            UPDATE diagnosis 
            SET 
                name = ?
            WHERE id = ?
        `;
        const params = [
            diagnosis.name,
        ];

        try {
            const [request] = await this.promiseConn.query(query, params);
            return request;
        } catch (err) {
            throw new Error('Database Error: '+err.message);
        }
    }

    async delete(id) {
        const query = "DELETE diagnosis WHERE id = ?";

        try {
            const [result] = await this.promiseConn.query(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async search(key) {
        const query = "SELECT * FROM diagnosis WHERE name = ?";

        try {
            const [rows] = await this.promiseConn.query(query, [`%${key}%`]);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }
}