import { conn } from "../database/dbConnection.js";


export const getAll = async (callback) => {
    var query = "SELECT * FROM employer LIMIT 10";
    conn.query(query, callback);
    console.log(query);
}

export const getOne = async (id, callback) => {
    var query = "SELECT * FROM employer WHERE id = "+id;
    conn.query(query, callback);
    console.log(query);
}

export const post = async (
    name, email, phone, join_date, role, salary, department
) => {
    var query = "INSERT INTO `employer`(`name`,`email`,`join_date`,`role`,`salary`,`phone`,`department`) ";
    var query =+ "VALUES('"+name+"','"+email+"','"+join_date+"','"+role+"','"+salary+"','"+phone+"','"+department+"')";

    conn.query(query, callback);
    console.log(query)
}

export const update = async (
    id, name, email, phone, join_date, role, salary, department
) => {
    var query = "UPDATE `employer` SET `id` = '"+id+"',`name` = '"+name+"',`join_date` = '"+join_date+"', `phone` = '"+phone+"' ";
    var query =+ " `email` = '"+email+"', `role` = '"+role+"', `salary` = '"+salary+"', `department` = '"+department+"' ";

    conn.query(query, callback)
    console.log(query)
}

export const search = async (id,callback) => {
    var query = "SELECT * FROM employer WHERE first_name LIKE "%'+key+'%"'";
    conn.query(query, callback);
    console.log(query);
}

export const trash = async (id, callback) => {
    var query = "DELETE FROM employer WHERE id = "+id;
    conn.query(query, callback);
}