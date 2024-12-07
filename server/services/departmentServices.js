export class DepartmentService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll() {
        const query = "SELECT * FROM department LIMIT 10";
        try {
            const [rows] = await this.promiseConn.query(query);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async getOne(id) {
        const query = "SELECT * FROM department WHERE id = "+id;
        
        try {
            const [rows] = await this.promiseConn.query(query, [id]);
            return rows[0];
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async post(department) {
        const query =  `
            INSERT INTO department (name,description) 
            VALUES (?, ?)
        `;
        const params = [
            department.name, 
            department.description,
        ];

        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async update(department) {
        const query = `
            UPDATE department 
            SET 
                name = ?, description = ?
            WHERE id = ?
        `;
        const params = [
            department.name, 
            department.description,
        ];

        try {
            const [request] = await this.promiseConn.query(query, params);
            return request;
        } catch (err) {
            throw new Error('Database Error: '+err.message);
        }
    }

    async delete(id) {
        const query = "DELETE department WHERE id = ?";

        try {
            const [result] = await this.promiseConn.query(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async search(key) {
        const query = "SELECT * FROM department WHERE name = ?";

        try {
            const [rows] = await this.promiseConn.query(query, [`%${key}%`]);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }
}