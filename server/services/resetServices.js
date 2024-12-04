import { conn } from "../database/dbConnection.js";

export const findOne = (email, callback) => {
    var query = "SELECT * FROM users where email = '"+email+"' ";
    conn.query(query, callback);
    console.log(query);
}

export const temp = (id, email, token, callback) => {
    var query = "INSERT INTO `temp`(`id`,`email`,`token`) VALUES('"+id+"','"+email+"','"+token+"') ";
    conn.query(query, callback);
    console.log(query);
}