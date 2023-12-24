const DriverModel = require('../models/dashboardDriversModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const addDriver = async (req, res) => {
  const driverValidationSchema = Joi.object({
    driver_username: Joi.string().pattern(/^[^\s]+$/).required().messages({
      'string.pattern.base': 'Username must not contain spaces.',
    }),
    driver_email: Joi.string().email().required(),
    driver_password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Password must be 8-16 characters long and include at least one uppercase letter, one number, and one special character.',
      }),
    driver_license: Joi.number().integer().min(10000000).max(99999999).required().messages({
      'number.base': 'Driver license must be a number with 8 digits.',
    }),
    truck_type: Joi.string().required(),
    production_year: Joi.number().integer().min(2010).required().messages({
      'number.base': 'Production year must be a number greater than or equal to 2010.',
    }),
    plate_number: Joi.number().integer().required(),
    driver_size_type: Joi.string().required(),
  });
  
  const { error } = driverValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    driver_username,
    driver_email,
    driver_password,
    driver_license,
    truck_type,
    production_year,
    plate_number,
    driver_size_type,
  } = req.body;

  try {
    const newDriver = await DriverModel.addDriver(
      driver_username,
      driver_email,
      driver_password,
      driver_license,
      truck_type,
      production_year,
      plate_number,
      driver_size_type
    );

    const token = jwt.sign(
      { driver_id: newDriver.driver_id, driver_email: newDriver.driver_email, role_id: newDriver.role_id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ driver: newDriver, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All Drivers
const getAllDrivers = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 , search } = req.query;
    const offset = (page - 1) * pageSize;
    const drivers = await DriverModel.getAllDrivers( pageSize , offset , search);
    res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Driver by ID
const getDriverById = async (req, res) => {
  const driverId = req.params.driver_id;
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
// const updateDriverById = async (req, res) => {
//   const driverId = req.params.driver_id;
//   console.log(driverId);
//   const { driver_username, driver_email, driver_password, status } = req.body;

//   try {
//     const updatedDriver = await DriverModel.updateDriverById( driver_username, driver_email, driver_password,status,driverId);

//     if (!updatedDriver) {
//       return res.status(404).json({ error: 'Driver not found' });
//     }

//     res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const updateDriverById = async (req, res) => {
  const driverId = req.params.driver_id;
  console.log(driverId);
  const { driver_username, driver_email,driver_license, truck_type,production_year,plate_number,driver_size_type,status } = req.body;

  try {
    const updatedDriver = await DriverModel.updateDriverById( driver_username, driver_email,driver_license, truck_type,production_year,plate_number,driver_size_type,status,driverId);

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
  addDriver,
};
