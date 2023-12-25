const faqModel = require('../models/faqModel');

// Controller function to save a new FAQ
const saveFAQ = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const savedFAQ = await faqModel.saveFAQ(question, answer);
    res.status(200).json( savedFAQ );
  } catch (error) {
    console.error('Error in saveFAQ controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get all FAQs
const getAllFAQs = async (req, res) => {
  try {
    const {page = 1 , pageSize = 5 , search} = req.query;
    const offset = (page - 1) * pageSize;
    const faqs = await faqModel.getAllFAQs(pageSize , offset , search);
    res.status(200).json( faqs );
  } catch (error) {
    console.error('Error in getAllFAQs controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllFAQsHome = async (req, res) => {
  try {
    const faqs = await faqModel.getAllFAQsHome();
    res.status(200).json(faqs);
  } catch (error) {
    console.error('Error in getAllFAQs controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller function to get a specific FAQ by ID
const getFAQById = async (req, res) => {
  const { faqId } = req.params;
 
  try {
    const faq = await faqModel.getFAQById(faqId);

    if (faq) {
    res.status(200).json( faq );

    } else {
      res.status(404).json({ success: false, message: 'FAQ not found' });
    }
  } catch (error) {
    console.error('Error in getFAQById controller:', error);
    res.status(500).json({ success: false, message: 'Failed to get FAQ' });
  }
};

// Controller function to update a FAQ
const updateFAQ = async (req, res) => {
  const { faqId } = req.params;
  console.log("faqId" ,faqId);
  const { question, answer } = req.body;

  try {
    const updatedFAQ = await faqModel.updateFAQ( question, answer,faqId);

    if (updatedFAQ) {
      res.status(200).json( updatedFAQ );

    } else {
      res.status(404).json({ success: false, message: 'FAQ not found' });
    }
  } catch (error) {
    console.error('Error in updateFAQ controller:', error);
    res.status(500).json({ success: false, message: 'Failed to update FAQ' });
  }
};

// Controller function to soft delete a FAQ
const deleteFAQ = async (req, res) => {
  const { faqId } = req.params;
  try {
    const deletedFAQ = await faqModel.deleteFAQ(faqId);

    if (deletedFAQ) {
      res.status(200).json( deletedFAQ );
    } else {
      res.status(404).json({ success: false, message: 'FAQ not found' });
    }
  } catch (error) {
    console.error('Error in deleteFAQ controller:', error);
    res.status(500).json({ success: false, message: 'Failed to delete FAQ' });
  }
};

const undeleteFAQ = async (req, res) => {
  const { faqId } = req.params;
  try {
    const deletedFAQ = await faqModel.undeleteFAQ(faqId);

    if (deletedFAQ) {
      res.status(200).json( deletedFAQ );
    } else {
      res.status(404).json({ success: false, message: 'FAQ not found' });
    }
  } catch (error) {
    console.error('Error in deleteFAQ controller:', error);
    res.status(500).json({ success: false, message: 'Failed to delete FAQ' });
  }
};


module.exports = {
  saveFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  getAllFAQsHome,
  undeleteFAQ,
};
