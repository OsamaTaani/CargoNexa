const express = require('express');
const faqController = require('../controllers/faqController');

const router = express.Router();

// Route to save a new FAQ
router.post('/faq', faqController.saveFAQ);

// Route to get all FAQs
router.get('/faq', faqController.getAllFAQs);

// Route to get a specific FAQ by ID
router.get('/faq/:faqId', faqController.getFAQById);

// Route to update a FAQ
router.put('/faq/:faqId', faqController.updateFAQ);

// Route to soft delete a FAQ
router.delete('/faq/:faqId', faqController.deleteFAQ);

module.exports = router;
