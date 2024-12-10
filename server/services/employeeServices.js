export class EmployeeService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll() {
        const query = "SELECT * FROM employee LIMIT 10";
        try {
            const [rows] = await this.promiseConn.query(query);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async getOne(id) {
        const query = "SELECT * FROM employee WHERE id = "+id;
        
        try {
            const [rows] = await this.promiseConn.query(query, [id]);
            return rows[0];
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async post(employer) {
        const query =  `
            INSERT INTO employee (name,email,join_date,role,salary,phone,department) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            employer.name, 
            employer.email, 
            employer.phone, 
            employer.join_date, 
            employer.role, 
            employer.salary, 
            employer.department
        ];

        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async update(employer) {
        const query = `
            UPDATE employee 
            SET 
                name = ?, email = ?, phone = ?, join_date = ?, role = ?, 
                salary = ?, department = ? 
            WHERE id = ?
        `;
        const params = [
            employer.name, 
            employer.email, 
            employer.phone, 
            employer.join_date, 
            employer.role, 
            employer.salary, 
            employer.department,
            department.id
        ];

        try {
            const [request] = await this.promiseConn.query(query, params);
            return request;
        } catch (err) {
            throw new Error('Database Error: '+err.message);
        }
    }

    async delete(id) {
        const query = "DELETE employee WHERE id = ?";

        try {
            const [result] = await this.promiseConn.query(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }

    async search(key) {
        const query = "SELECT * FROM employee WHERE first_name = ?";

        try {
            const [rows] = await this.promiseConn.query(query, [`%${key}%`]);
            return rows;
        } catch (err) {
            throw new Error('Database error: '+err.message);
        }
    }
}