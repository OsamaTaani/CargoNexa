// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddelware = require('../middleware/authMiddleware');

router.post('/send-message' ,contactController.contactUs);

module.exports = router;
