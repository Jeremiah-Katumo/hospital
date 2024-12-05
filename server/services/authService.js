import db, { promiseConn } from '../database/dbConnection.js';


export const findUserByUsername = async (username) => {
  try {
    const [results] = await promiseConn.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return results;
  } catch (error) {
    console.error('Error finding user by username:', error.message);
    throw error;
  }
};

export const insertUser = async (username, email, hashedPassword, emailStatus) => {
  try {
    await promiseConn.query(
      'INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, emailStatus]
    );
  } catch (error) {
    console.error('Error inserting user:', error.message);
    throw error;
  }
};

export const insertVerificationToken = async (username, email, token) => {
  try {
    await promiseConn.query(
      'INSERT INTO verify (username, email, token) VALUES (?, ?, ?)',
      [username, email, token]
    );
  } catch (error) {
    console.error('Error inserting verification token:', error.message);
    throw error;
  }
};

export const getUserIdByEmail = async (email) => {
  try {
    const [results] = await promiseConn.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    return results[0];
  } catch (error) {
    console.error('Error getting user ID by email:', error.message);
    throw error;
  }
};

export const signup = async (username, email, password, status) => {
  try {
    const [existingUser] = await promiseConn.query(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length === 0) {
      const query = 'INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)';
      await promiseConn.query(query, [username, email, password, status]);
      console.log('User signed up successfully');
    } else {
      console.error('Error: Email already exists');
    }
  } catch (error) {
    console.error('Error during signup:', error.message);
    throw error;
  }
};
