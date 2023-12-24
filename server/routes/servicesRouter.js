const express = require('express');
const servicesController = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Define routes for fetching, adding, updating, and soft deleting services
router.get('/getAll/services', servicesController.getAllServices);
router.post('/create/services', upload.single('image')   ,servicesController.createService );
router.put('/update/services/:serviceId',upload.single('image') ,servicesController.updateServiceById);
router.put('/services/softDelete/:serviceId', servicesController.deleteServiceById);
router.get('/services/getService/:serviceId' , servicesController.getServiceById);

module.exports = router;
