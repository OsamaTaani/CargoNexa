const ServiceModel = require('../models/servicesModel');

const Firebase = require('../middleware/firebaseMiddleware')

const getAllServicesDashboard = async (req, res) => {
  try {
    const {page = 1 , pageSize = 5 , search } = req.query;
    const offset = (page -1 ) * pageSize;
    const services = await ServiceModel.getAllServicesDashboard(pageSize , offset , search);
    res.status(200).json( services );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllServices = async (req, res) => {
  try {

    const services = await ServiceModel.getAllServices();
    res.status(200).json( services );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getServiceById = async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    const service = await ServiceModel.getServiceById(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json( service );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createService = async (req, res) => {

  try {

    const file = req.file;

            if (file) {
                const fileName = `${Date.now()}_${file.originalname}`;
                const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);
    
                req.body.services_image = fileUrl;
            }
            const { services_title, services_description, services_image } = req.body;

    const newService = await ServiceModel.createService(services_title, services_description, services_image);

    res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateServiceById = async (req, res) => {

  try {

    const file = req.file;

            if (file) {
                const fileName = `${Date.now()}_${file.originalname}`;
                const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);
                req.body.services_image = fileUrl;
            }
            const serviceId = req.params.serviceId;

            const updatedInfo = req.body;
        
    const updatedService = await ServiceModel.updateServiceById(serviceId, updatedInfo);

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteServiceById = async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    const deletedService = await ServiceModel.deleteServiceById(serviceId);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully', service: deletedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const undeleteServiceById = async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    const deletedService = await ServiceModel.undeleteServiceById(serviceId);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service undeleted successfully', service: deletedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteServiceById,
  undeleteServiceById,
  getAllServicesDashboard
};
