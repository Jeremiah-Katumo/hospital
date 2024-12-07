class LeaveService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async getAll(limit = 10) {
        const query = 'SELECT * FROM leave LIMIT ?';
        try {
            const [results] = await this.promiseConn.query(query, [limit]);
            return results;
        } catch (error) {
            console.error('Error fetching leaves:', error.message);
            throw error;
        }
    }

    async post({ firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason }) {
        const query = `
            INSERT INTO leave (first_name, last_name, employee_id, leave_type, date_from, date_to, reason)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason];

        try {
            const [result] = await this.promiseConn.query(query, params);
            return result;
        } catch (error) {
            console.error('Error adding leave:', error.message);
            throw error;
        }
    }

    async update(id, { firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason }) {
        const query = `
            UPDATE leave 
            SET 
                first_name = ?, last_name = ?, employee_id = ?, leave_type = ?, date_from = ?, date_to = ?, reason = ?
            WHERE id = ?
        `;
        const params = [firstName, lastName, employeeId, leaveType, dateFrom, dateTo, reason, id];

        try {
            const [result] = await this.promiseConn.query(query, params);
            if (result.affectedRows === 0) {
                throw new Error(`Leave with ID ${id} not found!`);
            }
            return result;
        } catch (error) {
            console.error('Error updating leave:', error.message);
            throw error;
        }
    }

    async search(key) {
        const query = `SELECT * FROM leave WHERE first_name LIKE ?`;
        const params = [`%${key}%`];

        try {
            const [results] = await this.promiseConn.query(query, params);
            return results;
        } catch (error) {
            console.error('Error searching leaves:', error.message);
            throw error;
        }
    }

    async trash(id) {
        const query = `DELETE FROM leave WHERE id = ?`;
        const params = [id];

        try {
            const [result] = await this.promiseConn.query(query, params);
            if (result.affectedRows === 0) {
                throw new Error(`Leave with ID ${id} not found!`);
            }
            return result;
        } catch (error) {
            console.error('Error deleting leave:', error.message);
            throw error;
        }
    }
}

export default LeaveService;
