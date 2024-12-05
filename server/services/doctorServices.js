import db, { conn } from "../database/dbConnection.js";


export const getAll = async (callback) => {
    var query = "SELECT * FROM doctor LIMIT 10";
    conn.query(query, callback);
    console.log(query);
}

export const getOne = async (id, callback) => {
    var query = "SELECT * FROM doctor WHERE id = "+id;
    conn.query(query, callback);
    console.log(query);
}

export const post = async (
    first_name, last_name, email, phone, dob, gender, address, department, biography
) => {
    const query = `
        INSERT INTO doctor (first_name, last_name, email, phone, dob, gender, address, department, biography) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [first_name, last_name, email, phone, dob, gender, address, department, biography];

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
    id, first_name, last_name, email, phone, dob, gender, address, department, biography
) => {
    // const formattedDob = new Date(dob).toISOString().split('T')[0];  // if dob is a date string, this will format it correctly

    var query = `
        UPDATE doctor 
        SET 
            first_name = ?, last_name = ?, email = ?, gender = ?, dob = ?, 
            phone = ?, address = ?, department = ?, biography = ? 
        WHERE id = ?
    `;
    var params = [first_name, last_name, email, gender, dob, phone, address, department, biography, id];

    conn.query(query, params, (err, result) => {
        if (err) {
            console.error('Database error:', err);
        } else {
            console.log('Update successful:', result);
        }
    });

    console.log(query);  // For debugging: Check the final query and parameters
}


export const search = async (id,callback) => {
    var query = "SELECT * FROM doctor WHERE first_name LIKE "%'+key+'%"'";
    conn.query(query, callback);
    console.log(query);
}

export const trash = async (id, callback) => {
    var query = "DELETE FROM doctor WHERE id = "+id;
    conn.query(query, callback);
}