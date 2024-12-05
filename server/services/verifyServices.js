import db, { conn } from "../database/dbConnection.js";


// export const verify = function (username, email, token, callback) {
//     var query = "INSERT INTO `verify`(`username`,`email`,`token`) VALUES('"+username+"', '"+email+"', '"+token+"')";
//     db.query(query, callback);
// }

// export const getuserid = function (email, callback) {
//     var query = "SELECT * from verify WHERE email = '"+email+"' ";
//     db.query(query, callback);
// }

export const matchToken = function (id, token, callback) {
    var query = "SELECT * from `verify` WHERE token = '"+token+"' and id = " +id;
    conn.query(query, callback);
    console.log(query);
}

export const updateVerify = function (email, email_status, callback) {
    var query = "UPDATE `users` SET email_status = '"+email_status+"' WHERE email = " +email;
    conn.query(query, callback);
    console.log(query);
}