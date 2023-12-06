// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddelware = require('../middleware/authMiddleware');

router.post('/send-message', authMiddelware.authorize([1]) ,contactController.contactUs);

module.exports = router;
