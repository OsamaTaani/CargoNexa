const solutionModel = require('../models/solutionModel');
const Firebase = require('../middleware/firebaseMiddleware')

const getAllSolutionsDashboard = async (req, res) => {
  try {
    const {page =1 , pageSize = 5 , search } = req.query;
    const offset = (page - 1) * pageSize
    const solutions = await solutionModel.getAllSolutionsDashboard(pageSize , offset , search);
    res.status(200).json( solutions );
  } catch (error) {
    console.error('Error in getAllSolutions controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllSolutions = async (req, res) => {
  try {
    const solutions = await solutionModel.getAllSolutions();
    res.status(200).json( solutions );
  } catch (error) {
    console.error('Error in getAllSolutions controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getSolutionById = async (req, res) => {
  const  solutionId  = req.params.solutionId;

  try {
    const solution = await solutionModel.getSolutionById(solutionId);

    if (solution) {
      res.json(solution);
    } else {
      res.status(404).json({ success: false, message: 'Solution not found' });
    }
  } catch (error) {
    console.error('Error in getSolutionById controller:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the request' });
  }
};

const createSolution = async (req, res) => {

  try {

    const file = req.file;

            if (file) {
                const fileName = `${Date.now()}_${file.originalname}`;
                const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);
    
                req.body.solution_image = fileUrl;
            }
            const { solution_title, solution_description, solution_image } = req.body;

    const newSolution = await solutionModel.createSolution(solution_title, solution_description, solution_image);
    res.json({ success: true, solution: newSolution, message: 'Solution created successfully' });
  } catch (error) {
    console.error('Error in createSolution controller:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the request' });
  }
};

const updateSolution = async (req, res) => {
  const  solutionId  = req.params.solutionId;

  try {

    const file = req.file;

            if (file) {
                const fileName = `${Date.now()}_${file.originalname}`;
                const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);
    
                req.body.solution_image = fileUrl;
            }

            const { solution_title, solution_description, solution_image  } = req.body;
          
    const updatedSolution = await solutionModel.updateSolution( solution_title, solution_description, solution_image ,solutionId);

    if (updatedSolution) {
      res.json({ success: true, solution: updatedSolution, message: 'Solution updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Solution not found' });
    }
  } catch (error) {
    console.error('Error in updateSolution controller:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the request' });
  }
};

const softDeleteSolution = async (req, res) => {
  const solutionId  = req.params.solutionId;

  try {
    const deletedSolution = await solutionModel.softDeleteSolution(solutionId);

    if (deletedSolution) {
      res.json({ success: true, solution: deletedSolution, message: 'Solution soft-deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Solution not found' });
    }
  } catch (error) {
    console.error('Error in softDeleteSolution controller:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the request' });
  }
};

const undeleteSolution = async (req, res) => {
  const solutionId  = req.params.solutionId;

  try {
    const deletedSolution = await solutionModel.undeleteSolution(solutionId);

    if (deletedSolution) {
      res.json({ success: true, solution: deletedSolution, message: 'Solution soft-deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Solution not found' });
    }
  } catch (error) {
    console.error('Error in unDeleteSolution controller:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing the request' });
  }
};


module.exports = {
  getAllSolutionsDashboard,
  getSolutionById,
  createSolution,
  updateSolution,
  softDeleteSolution,
  getAllSolutions,
  undeleteSolution,
};
