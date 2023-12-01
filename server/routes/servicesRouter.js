const express = require('express');
const servicesController = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Define routes for fetching, adding, updating, and soft deleting services
router.get('/services', servicesController.getServices);
router.post('/services', upload.single('image')   ,servicesController.addService );
router.put('/services/:id', servicesController.updateService);
router.delete('/services/:id', servicesController.softDeleteService);

module.exports = router;
