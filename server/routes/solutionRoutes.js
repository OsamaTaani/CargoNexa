// routes/solutionRoutes.js
const express = require('express');
const router = express.Router();
const solutionController = require('../controllers/solutionController');
const authMiddleware = require('../middleware/authMiddleware')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/getAll/solutions', authMiddleware.authorize([3]) ,solutionController.getAllSolutionsDashboard);

router.get('/home/solutions', solutionController.getAllSolutions);

router.get('/solutions/:solutionId', authMiddleware.authorize([3]),solutionController.getSolutionById);

router.post('/solutions/create', upload.single('image') ,authMiddleware.authorize([3]),solutionController.createSolution);

router.put('/solutions/update/:solutionId',upload.single('image') ,authMiddleware.authorize([3]),solutionController.updateSolution);

router.put('/solutions/softDelete/:solutionId', authMiddleware.authorize([3]),solutionController.softDeleteSolution);

router.put('/solutions/undelete/:solutionId', solutionController.undeleteSolution);

module.exports = router;
