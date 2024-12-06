import db, { conn } from "../database/dbConnection.js";


export const getAll = async (callback) => {
    var query = "SELECT * FROM employer LIMIT 10";
    db.query(query, callback);
    console.log(query);
}

export const getOne = async (id, callback) => {
    var query = "SELECT * FROM employer WHERE id = "+id;
    db.query(query, callback);
    console.log(query);
}

export const post = async (
    name, email, phone, join_date, role, salary, department
) => {
    var query = `
        INSERT INTO employer (name,email,join_date,role,salary,phone,department) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [name, email, phone, join_date, role, salary, department];

    conn.query(query, params, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            // return res.status(500).json({success: true, message: 'An error occurred while adding the doctor.'});
        }
        // return res.status(201).json({success: true, message: 'Doctor added successfuly!'});
    });

    console.log(query);
}

export const update = async (
    id, name, email, phone, join_date, role, salary, department
) => {
    var query = `
        UPDATE doctor 
        SET 
            name = ?, email = ?, phone = ?, join_date = ?, role = ?, 
            salary = ?,, department = ? 
        WHERE id = ?
    `;
    var params = [name, email, phone, join_date, role, salary, department, id];

    conn.query(query, params, (err, result) => {
        if (err) {
            console.error('Database error:', err);
        } else {
            console.log('Update successful:', result);
        }
    });

    console.log(query);
}

export const search = async (id,callback) => {
    var query = "SELECT * FROM employer WHERE first_name LIKE "%'+key+'%"'";
    db.query(query, callback);
    console.log(query);
}

export const trash = async (id, callback) => {
    var query = "DELETE FROM employer WHERE id = "+id;
    db.query(query, callback);
}