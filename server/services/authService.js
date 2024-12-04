import db, { conn } from '../database/dbConnection.js';

export const findUserByUsername = async (username) => {
  const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return results;
};

export const insertUser = async (username, email, hashedPassword, emailStatus) => {
  await db.query(
    'INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, emailStatus]
  );
};

export const insertVerificationToken = async (username, email, token) => {
  await db.query(
    'INSERT INTO email_verifications (username, email, token) VALUES (?, ?, ?)',
    [username, email, token]
  );
};

export const getUserIdByEmail = async (email) => {
  const [results] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  return results[0];
};

export const signup = function(username, email, password, status, callback) {
  conn.query('SELECT email from users WHERE email = "'+email+'" ', function(err, result) {
      if (result[0] == undefined) {
          var query = "INSERT INTO `users`(`username`,`email`,`password`,'email_status`) VALUES('"+username+"','"+email+"','"+password+"','"+status+"')";
          console.log(query);
      } else {
          console.log("Error:", err.message);
      }  
  })
}
