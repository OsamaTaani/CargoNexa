const express = require('express');
const servicesController = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Define routes for fetching, adding, updating, and soft deleting services
router.get('/services', servicesController.getAllServices);
router.post('/services', upload.single('image')   ,servicesController.createService );
router.put('/services/:serviceId',upload.single('image') ,servicesController.updateServiceById);
router.delete('/services/:id', servicesController.deleteServiceById);

module.exports = router;
