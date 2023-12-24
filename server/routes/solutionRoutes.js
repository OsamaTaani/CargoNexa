// routes/solutionRoutes.js
const express = require('express');
const router = express.Router();
const solutionController = require('../controllers/solutionController');

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Get all solutions
router.get('/getAll/solutions', solutionController.getAllSolutions);

// Get solution by ID
router.get('/solutions/:solutionId', solutionController.getSolutionById);

// Create a new solution
router.post('/solutions/create', upload.single('image')  ,solutionController.createSolution);

// Update a solution by ID
router.put('/solutions/update/:solutionId',upload.single('image')  ,solutionController.updateSolution);

// Soft delete a solution by ID
router.put('/solutions/softDelete/:solutionId', solutionController.softDeleteSolution);

module.exports = router;
