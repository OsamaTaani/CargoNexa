const express = require('express');
const faqController = require('../controllers/faqController');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/create/faq', authMiddleware.authorize([3]) ,faqController.saveFAQ);

router.get('/getAll/faq', authMiddleware.authorize([3]) ,faqController.getAllFAQs);

router.get('/faq/:faqId', authMiddleware.authorize([3]) ,faqController.getFAQById);

router.put('/update/faq/:faqId', authMiddleware.authorize([3]) ,faqController.updateFAQ);

router.put('/soft-delete/faq/:faqId', authMiddleware.authorize([3]) ,faqController.deleteFAQ);

router.put('/undelete/faq/:faqId',authMiddleware.authorize([3]) , faqController.undeleteFAQ);

router.get('/faqHome',faqController.getAllFAQsHome)

module.exports = router;
