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

const updateSolution = async ( solution_title, solution_description, solution_image ,solutionId) => {
  try {
    const result = await pool.query(
      'UPDATE solutions SET solution_title = $1, solution_description = $2, solution_image = $3 WHERE solution_id = $4 RETURNING *',
      [ solution_title, solution_description, solution_image , solutionId]
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
      'UPDATE solutions SET isdeleted = true WHERE solution_id = $1 AND isdeleted = false RETURNING *',
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
