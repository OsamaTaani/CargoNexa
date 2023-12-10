const DriverModel = require('../models/dashboardDriversModel');
require('dotenv').config();


// Get All Drivers
const getAllDrivers = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;
    const drivers = await DriverModel.getAllDrivers( pageSize , offset);
    res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Driver by ID
const getDriverById = async (req, res) => {
  const driverId = req.user.driver_id;
  console.log(driverId);

  try {
    const driver = await DriverModel.getDriverById(driverId);

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.status(200).json(driver );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update Driver by ID
const updateDriverById = async (req, res) => {
  const driverId = req.user.driver_id;
  console.log(driverId);
  const { driver_username, driver_email, driver_password, driver_license,
    truck_type, production_year, plate_number, truck_image, driver_size_type , status } = req.body;

  try {
    const updatedDriver = await DriverModel.updateDriverById( driver_username, driver_email, driver_password, driver_license,
        truck_type, production_year, plate_number, truck_image, driver_size_type , status,driverId,);

    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete Driver by ID
const deleteDriverById = async (req, res) => {
  const driverId = req.params.driverId;

  try {
    const deletedDriver = await DriverModel.deleteDriverById(driverId);

    if (!deletedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver soft deleted successfully', driver: deletedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  updateDriverById,
  deleteDriverById,
};
