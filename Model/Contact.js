const {pool} = require('../Database/Config');

class Contact {
  static async getAll() {
    const result = await pool.query('SELECT * FROM contacts');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ name, firstName, email, phoneNumber, message, subject }) {
    console.log('Received data model:', { name, firstName, email, phoneNumber, message, subject });

    const result = await pool.query('INSERT INTO contacts (nom, prenom, email, phone_number, message, subject) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[name, firstName, email, phoneNumber, message, subject]);
    return result.rows[0];
  }

  static async update(id, { name, firstName, email, phoneNumber, message, subject }) {
    const result = await pool.query(
      'UPDATE contacts SET nom = $1, prenom = $2, email = $3, phone_number = $4, message = $5, subject = $6 WHERE id = $7 RETURNING *',
      [name, firstName, email, phoneNumber, message, subject, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Contact;
