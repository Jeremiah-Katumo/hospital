export default class AuthService {
  constructor(promiseConn) {
      this.promiseConn = promiseConn;
  }

  async findUserByUsername(username) {
      try {
          const [results] = await this.promiseConn.query(
              'SELECT * FROM users WHERE username = ?',
              [username]
          );
          return results[0];
      } catch (error) {
          console.error('Error finding user by username:', error.message);
          throw error;
      }
  }

  async insertUser({ username, email, password, emailStatus }) {
      try {
          await this.promiseConn.query(
              'INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)',
              [username, email, password, emailStatus]
          );
      } catch (error) {
          console.error('Error inserting user:', error.message);
          throw error;
      }
  }

  async insertVerificationToken({ username, email, token }) {
      try {
          await this.promiseConn.query(
              'INSERT INTO verify (username, email, token) VALUES (?, ?, ?)',
              [username, email, token]
          );
      } catch (error) {
          console.error('Error inserting verification token:', error.message);
          throw error;
      }
  }

  async getUserIdByEmail(email) {
      try {
          const [results] = await this.promiseConn.query(
              'SELECT id FROM users WHERE email = ?',
              [email]
          );
          return results[0]?.id || null;
      } catch (error) {
          console.error('Error getting user ID by email:', error.message);
          throw error;
      }
  }

  async updateEmailVerificationStatus(email, status) {
      try {
          await this.promiseConn.query(
              'UPDATE users SET email_status = ? WHERE email = ?',
              [status, email]
          );
      } catch (error) {
          console.error('Error updating email verification status:', error.message);
          throw error;
      }
  }
}
