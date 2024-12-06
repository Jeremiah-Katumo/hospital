import db, { conn } from '../database/dbConnection.js';

export const getAll = (callback) => {
    const query = 'SELECT * FROM patient LIMIT 10';
    conn.query(query, callback);
    console.log(query);
}

export const getOne = (id, Callback) => {
    const query = 'SELECT * FROM patient WHERE id = '+id;
    conn.query(query, callback);
    console.log(query);
}

export const post = (
    first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth
) => {
    var query = `
        INSERT INTO patient (first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth];
    conn.query(query, params, (err, result) => {
        if (err) {
            console.log('Database error', err);
        }
    })

    console.log(query);
}

export const update = (
    first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth
) => {
    var query = `
        UPDATE patient
        SET 
            first_name = ?, last_name = ?, doctor_id = ?, patient_number = ?, 
            diagnosis = ?, location = ?, date_of_birth = ?
        WHERE id = ?
    `;
    const params = [first_name, last_name, doctor_id, patient_number, diagnosis, location, date_of_birth];

    conn.query(query, params, (err, result) => {
        if (err) {
            console.error('Database error:', err);
        } else {
            console.log('Patient update successful:', result);
        }
    });

    console.log(query);
}

export const search = async (id,callback) => {
    var query = "SELECT * FROM patient WHERE first_name LIKE "%'+key+'%"'";
    db.query(query, callback);
    console.log(query);
}

export const trash = async (id, callback) => {
    var query = "DELETE FROM patient WHERE id = "+id;
    db.query(query, callback);
}