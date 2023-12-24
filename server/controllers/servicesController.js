const ServiceModel = require('../models/servicesModel');

const Firebase = require('../middleware/firebaseMiddleware')

// Get All Services
const getAllServices = async (req, res) => {
  try {
    const {page = 1 , pageSize = 5 , search } = req.query;
    const offset = (page -1 ) * pageSize;
    const services = await ServiceModel.getAllServices(pageSize , offset , search);
    res.status(200).json( services );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get Service by ID
const getServiceById = async (req, res) => {
  const serviceId = req.params.serviceId;
  console.log(serviceId);

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

// Create Service
const createService = async (req, res) => {

  try {

    const file = req.file;

            if (file) {
                const fileName = `${Date.now()}_${file.originalname}`;
                const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);
                console.log(fileUrl);
    
                req.body.services_image = fileUrl;
            }
            const { services_title, services_description, services_image } = req.body;

    const newService = await ServiceModel.createService(services_title, services_description, services_image);

    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Service by ID
const updateServiceById = async (req, res) => {
  const serviceId = req.params.serviceId;
  console.log(serviceId);

  try {

    const file = req.file;

            if (file) {
                const fileName = `${Date.now()}_${file.originalname}`;
                const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);
    
                req.body.services_image = fileUrl;
            }
            const { services_title, services_description, services_image } = req.body;
        
    const updatedService = await ServiceModel.updateServiceById(serviceId, services_title, services_description, services_image);

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete Service by ID
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

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteServiceById,
};



// const servicesModel = require('../models/servicesModel');

// const Firebase = require('../middleware/firebaseMiddleware')

// const getServices = async (req, res) => {
//     try {
//       const servicesData = await servicesModel.getServices();
//       res.send(servicesData);
//     } catch (error) {
//       console.error('Error getting services:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };
  
//   const addService = async (req, res) => {
//     try {

//         const file = req.file;

//         if (file) {
//             const fileName = `${Date.now()}_${file.originalname}`;
//             const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);

//             req.body.services_image = fileUrl;
//         }
  
//       const newService = await servicesModel.addService(req.body);
//       res.send(newService);
//     } catch (error) {
//       console.error('Error adding service:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };
  
//   const updateService = async (req, res) => {
//     const { services_id } = req.params;
//     try {
//       const file = req.file;

//         if (file) {
//             const fileName = `${Date.now()}_${file.originalname}`;
//             const fileUrl = await Firebase.uploadFileToFirebase(file, fileName);

//             req.body.services_image = fileUrl;
//         }
//       const updatedService = await servicesModel.updateService(services_id, req.body);
//       res.send(updatedService);
//     } catch (error) {
//       console.error('Error updating service:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };
  
//   const softDeleteService = async (req, res) => {
//     const { services_id } = req.params;
//     try {
//       const deletedService = await servicesModel.softDeleteService(services_id);
//       res.send(deletedService);
//     } catch (error) {
//       console.error('Error soft deleting service:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };
  
//   module.exports = {
//     getServices,
//     addService,
//     updateService,
//     softDeleteService,
//   };
  