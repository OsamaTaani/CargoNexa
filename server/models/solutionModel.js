// models/solutionModel.js
const {pool} = require('../db');

const getAllSolutions = async (pageSize , offset) => {
  try {
    const result = await pool.query('SELECT * , COUNT (*) OVER () AS total_count FROM solutions ORDER BY solution_id LIMIT $1 OFFSET $2',[pageSize , offset]);
    return result.rows;
  } catch (error) {
    console.error('Error in getAllSolutions:', error);
    throw error;
  }
};

const getSolutionById = async (solutionId) => {
  try {
    const result = await pool.query('SELECT * FROM solutions WHERE solution_id = $1 AND isdeleted = false', [solutionId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in getSolutionById:', error);
    throw error;
  }
};

const createSolution = async (title, description, image) => {
  try {
    const result = await pool.query(
      'INSERT INTO solutions (solution_title, solution_description, solution_image) VALUES ($1, $2, $3) RETURNING *',
      [title, description, image]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in createSolution:', error);
    throw error;
  }
};

const updateSolution = async (solutionId, title, description, image) => {
  try {
    const result = await pool.query(
      'UPDATE solutions SET solution_title = $2, solution_description = $3, solution_image = $4 WHERE solution_id = $1 AND isdeleted = false RETURNING *',
      [solutionId, title, description, image]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in updateSolution:', error);
    throw error;
  }
};

const softDeleteSolution = async (solutionId) => {
  try {
    const result = await pool.query(
      'UPDATE solutions SET is_deleted = true WHERE solution_id = $1 AND isdeleted = false RETURNING *',
      [solutionId]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in softDeleteSolution:', error);
    throw error;
  }
};

module.exports = {
  getAllSolutions,
  getSolutionById,
  createSolution,
  updateSolution,
  softDeleteSolution,
};
