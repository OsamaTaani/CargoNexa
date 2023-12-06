// models/contactModel.js

const {pool} = require('../db');

const saveContactMessage = async (contact_name, contact_email, subject, message) => {
  try {
    const result = await pool.query(
      'INSERT INTO contact_us (contact_name, contact_email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [contact_name, contact_email, subject, message]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in saveContactMessage model:', error);
    throw error;
  }
};

module.exports =  {saveContactMessage} ;
