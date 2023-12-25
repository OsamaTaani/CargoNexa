const express = require('express');
const servicesController = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Define routes for fetching, adding, updating, and soft deleting services
router.get('/getAll/services',authMiddleware.authorize([3]) ,servicesController.getAllServicesDashboard);
router.get('/home/services' ,servicesController.getAllServices);

router.post('/create/services', upload.single('image') ,authMiddleware.authorize([3]) ,servicesController.createService );
router.put('/update/services/:serviceId',upload.single('image') ,authMiddleware.authorize([3]) ,servicesController.updateServiceById);
router.put('/services/softDelete/:serviceId', authMiddleware.authorize([3]) ,servicesController.deleteServiceById);
router.put('/services/unDelete/:serviceId', authMiddleware.authorize([3]) ,servicesController.undeleteServiceById);

router.get('/services/getService/:serviceId' , authMiddleware.authorize([3]) ,servicesController.getServiceById);

module.exports = router;
