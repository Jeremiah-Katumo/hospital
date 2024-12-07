export class PatientService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    getAll(callback) {
        const query = 'SELECT * FROM patient LIMIT 10';
        this.promiseConn.query(query, callback);
        console.log(query);
    }

    getOne(id, callback) {
        const query = 'SELECT * FROM patient WHERE id = ?';
        this.promiseConn.query(query, [id], callback);
        console.log(query);
    }

    post(first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth) {
        const query = `
            INSERT INTO patient (first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth];

        this.promiseConn.query(query, params, (err, result) => {
            if (err) {
                console.log('Database error', err);
            }
        });

        console.log(query);
    }

    update(id, first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth) {
        const query = `
            UPDATE patient
            SET 
                first_name = ?, last_name = ?, doctor_id = ?, patient_number = ?, 
                diagnosis = ?, location = ?, date_of_birth = ?
            WHERE id = ?
        `;
        const params = [first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth, id];

        this.promiseConn.query(query, params, (err, result) => {
            if (err) {
                console.error('Database error:', err);
            } else {
                console.log('Patient update successful:', result);
            }
        });

        console.log(query);
    }

    search(key, callback) {
        const query = "SELECT * FROM patient WHERE first_name LIKE ?";
        this.promiseConn.query(query, [`%${key}%`], callback);
        console.log(query);
    }

    trash(id, callback) {
        const query = `UPDATE patient SET deleted_at = NOW() WHERE id = ?`;
        const params = [id];
        
        db.query(query, params, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    
        console.log(query);
    };

    restore(id, callback) {
        const query = `UPDATE patient SET deleted_at = NULL WHERE id = ?`;
        const params = [id];
        
        db.query(query, params, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    
        console.log(query);
    };
}
