import db, { conn } from '../database/dbConnection.js';

export const getAll = (callback) => {
    var query = 'SELECT * FROM leave LIMIT 10';
    conn.query(query, callback);
    console.log(query);
}

export const post = (
    first_name, last_name, employee_id, leave_type, date_from, date_to, reason
) => {
    var query = `
        INSERT INTO leave (first_name, last_name, employee_id, leave_type, date_from, date_to, reason)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [first_name, last_name, employee_id, leave_type, date_from, date_to, reason];

    conn.query(query, params, (err, result) => {
        if (err) {
            console.error('Database error', err);
        }
    })

    console.log(query);
}

export const update = (
    id, first_name, last_name, employee_id, leave_type, date_from, date_to, reason
) => {
    var query = `
        UPDATE leave 
        SET 
            first_name = ?, last_name = ?, employee_id = ?, leave_type = ?, date_from = ?, date_to = ?, reason = ?
        WHERE id = ?
    `;
    const params = [first_name, last_name, employee_id, leave_type, date_from, date_to, reason, id];

    conn.query(query, params, (err, result) => {
        if (err) {
            result.status(404).json({ error: `Leave with id ${id} does not exist!`});
        }
    })

    console.log(query);
}

export const search = async (id,callback) => {
    var query = "SELECT * FROM patient WHERE first_name LIKE "%'+key+'%"'";
    db.query(query, callback);
    console.log(query);
}

export const trash = async (id, callback) => {
    var query = "DELETE FROM leave WHERE id = "+id;
    db.query(query, callback);
}