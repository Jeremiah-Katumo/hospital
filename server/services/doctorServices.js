import { conn } from "../database/dbConnection.js";

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
    first_name, last_name, email, phone, dob, gender, address, department, biography, filename, callback
) => {
    var query = "INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`gender`,`dob`,`phone`,`address`,`department`,`biography`,`filename`) ";
    var query =+ "VALUES('"+first_name+"','"+last_name+"','"+email+"','"+gender+"','"+dob+"','"+phone+"','"+address+"','"+department+"', '"+biography+"','"+filename+"')";

    conn.query(query, callback);
    console.log(query)
}

export const update = async (
    id, first_name, last_name, email, phone, dob, gender, address, department, biography, filename, callback
) => {
    var query = "UPDATE `doctor` SET `id` = '"+id+"',`first_name` = '"+first_name+"',`last_name` = '"+last_name+"', `email` = '"+email+"', `gender` = '"+gender+"', `dob` = '"+dob+"' ";
    var query =+ " `phone` = '"+phone+"', `address` = '"+address+"', `department` = '"+department+"', `biography` = '"+biography+"', `filename` = '"+filename+"' ";

    conn.query(query, callback)
    console.log(query)
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