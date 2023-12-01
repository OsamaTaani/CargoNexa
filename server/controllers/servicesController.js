const servicesModel = require('../models/servicesModel');

const Firebase = require('../middleware/firebaseMiddleware')

const getServices = async (req, res) => {
    try {
      const servicesData = await servicesModel.getServices();
      res.send(servicesData);
    } catch (error) {
      console.error('Error getting services:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const addService = async (req, res) => {
    try {

        const file = req.file;

        if (file) {
            const fileName = `${Date.now()}_${file.originalname}`;
            const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);

            req.body.services_image = fileUrl;
        }
  
      const newService = await servicesModel.addService(req.body);
      res.send(newService);
    } catch (error) {
      console.error('Error adding service:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const updateService = async (req, res) => {
    const { services_id } = req.params;
    try {
      const updatedService = await servicesModel.updateService(services_id, req.body);
      res.send(updatedService);
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const softDeleteService = async (req, res) => {
    const { services_id } = req.params;
    try {
      const deletedService = await servicesModel.softDeleteService(services_id);
      res.send(deletedService);
    } catch (error) {
      console.error('Error soft deleting service:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports = {
    getServices,
    addService,
    updateService,
    softDeleteService,
  };
  