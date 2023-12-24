const express = require('express');
const faqController = require('../controllers/faqController');

const router = express.Router();

// Route to save a new FAQ
router.post('/create/faq', faqController.saveFAQ);

// Route to get all FAQs
router.get('/getAll/faq', faqController.getAllFAQs);

// Route to get a specific FAQ by ID
router.get('/faq/:faqId', faqController.getFAQById);

// Route to update a FAQ
router.put('/update/faq/:faqId', faqController.updateFAQ);

// Route to soft delete a FAQ
router.put('/soft-delete/faq/:faqId', faqController.deleteFAQ);

module.exports = router;
