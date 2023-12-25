const {pool} = require('../db');

// Function to save a new FAQ
const saveFAQ = async (question, answer) => {
  try {
    const result = await pool.query('INSERT INTO faq (question, answer) VALUES ($1, $2) RETURNING *', [
      question,
      answer,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error('Error in saveFAQ model:', error);
    throw error;
  }
};

// Function to get all FAQs
const getAllFAQs = async (pageSize , offset , searchTerm) => {
  try {
    const result = await pool.query('SELECT *, COUNT (*) OVER () AS total_count FROM faq WHERE question ILIKE $3 ORDER BY faq_id LIMIT $1 OFFSET $2' , [pageSize , offset , `%${searchTerm}%`]);

    return result.rows;
  } catch (error) {
    console.error('Error in getAllFAQs model:', error);
    throw error;
  }
};
const getAllFAQsHome = async () => {
  try {
    const result = await pool.query('SELECT * FROM faq WHERE isdeleted =false');
    return result.rows;
  } catch (error) {
    console.error('Error in getAllFAQs model:', error);
    throw error;
  }
};


// Function to get a specific FAQ by ID
const getFAQById = async (faqId) => {
  try {
    const result = await pool.query('SELECT * FROM faq WHERE faq_id = $1 AND isdeleted = false', [
      faqId,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error('Error in getFAQById model:', error);
    throw error;
  }
};

// Function to update a FAQ
const updateFAQ = async (question, answer,faqId) => {
  try {
    const result = await pool.query(
      'UPDATE faq SET question = $1, answer = $2 WHERE faq_id = $3 AND isdeleted = false RETURNING *',
      [question, answer, faqId]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in updateFAQ model:', error);
    throw error;
  }
};

// Function to soft delete a FAQ
const deleteFAQ = async (faqId) => {
  try {
    const result = await pool.query(
      'UPDATE faq SET isdeleted = true WHERE faq_id = $1 RETURNING *',
      [faqId]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in deleteFAQ model:', error);
    throw error;
  }
};

const undeleteFAQ = async (faqId) => {
  try {
    const result = await pool.query(
      'UPDATE faq SET isdeleted = false WHERE faq_id = $1 RETURNING *',
      [faqId]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in deleteFAQ model:', error);
    throw error;
  }
};


module.exports = {
  saveFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  getAllFAQsHome,
  undeleteFAQ,
};
