export class HospitalService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    // async getAll() {
    //     const query = 'SELECT * FROM hospital LIMIT 10';
    //     try {
    //         const [rows] = await this.promiseConn.query(query);
    //         return rows;
    //     } catch (err) {
    //         throw new Error('Database error: ' + err.message);
    //     }
    // }

    async getTotalCount() {
        const query = 'SELECT COUNT(*) AS total FROM hospital';
        const [result] = await this.promiseConn.query(query);
        return result[0].total;
    }

    // async getAll(start, length, searchTerm = '') {
    //     let query = `
    //         SELECT id, name, description, email, location, phone
    //         FROM hospital
    //         WHERE 1=1
    //     `;

    //     const queryParams = [];
    //     if (searchTerm) {
    //         query += `AND (name LIKE ? OR email LIKE ? OR location LIKE ?)`;
    //         queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`);
    //     }

    //     query += `LIMIT ? OFFSET ?`;
    //     queryParams.push(parseInt(length), parseInt(start));

    //     const [data] = await this.promiseConn.query(query, queryParams);
    //     return data;
    // }

    async fetch(start, length, searchValue) {
        let searchQuery = '';
        const queryParams = [];
    
        // Apply search filter if search term is provided
        if (searchValue) {
            searchQuery = `
                WHERE 
                    name LIKE ? OR 
                    description LIKE ? OR 
                    email LIKE ? OR 
                    location LIKE ? OR 
                    phone LIKE ?
            `;
            const searchTerm = `%${searchValue}%`;
            queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
        }
    
        // Query to fetch paginated results
        const dataQuery = `SELECT id, name, description, email, location, phone FROM hospital
            ${searchQuery}
            LIMIT ?, ?
        `;
        queryParams.push(start, length);
    
        const [hospitals] = await this.promiseConn.query(dataQuery, queryParams);
    
        // Query to get total records
        const [totalRecordsResult] = await this.promiseConn.query('SELECT COUNT(*) AS total FROM hospital');
        const totalRecords = totalRecordsResult[0].total;
    
        // Query to get filtered records
        let totalFiltered = totalRecords;
        if (searchValue) {
            const [filteredRecordsResult] = await this.promiseConn.query(
                `SELECT COUNT(*) AS total FROM hospital ${searchQuery}`,
                queryParams.slice(0, -2) // Exclude pagination params
            );
            totalFiltered = filteredRecordsResult[0].total;
        }
    
        return { hospitals, totalRecords, totalFiltered };
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
