// driverController.js
const DriverModel = require('../models/driverModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const registerDriver = async (req, res) => {
  const validationSchema = Joi.object({
    driver_username: Joi.string().pattern(/^[^\s]+$/).required().messages({
      'string.pattern.base': 'Username must not contain spaces.',
    }),
    driver_email: Joi.string().pattern(/.*@.*/).required().messages({
      'string.email': 'Email must be valid and contain @.',
    }),
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

  const { error } = validationSchema.validate(req.body);
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
    const existingDriver = await DriverModel.getDriverByEmail(driver_email);
    if (existingDriver) {
      return res.status(409).json({ error: 'Email is already registered for a driver' });
    }

    const newDriver = await DriverModel.createDriver(
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

const loginDriver = async (req, res) => {
    const validationSchema = Joi.object({
      driver_email: Joi.string().pattern(/.*@.*/).required().messages({
        'string.email': 'Email must be valid and contain @.',
      }),
      driver_password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Password must be 8-16 characters long and include at least one uppercase letter, one number, and one special character.',
        }),
          });
  
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const { driver_email, driver_password } = req.body;
  
    try {
  
      const driver = await DriverModel.verifyDriverCredentials(driver_email, driver_password );
  
      if (!driver) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { driver_id: driver.driver_id, driver_email: driver.driver_email , role_id:driver.role_id },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
      );
  
      res.status(200).json({ message: 'Login successful', driver, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getDriverInfo = async (req, res) => {
    const driverId = req.user.driver_id;
  
    try {
      const driver = await DriverModel.getDriverInfo(driverId);
  
      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }
  
      res.status(200).json(driver );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updateDriver = async (req, res) => {
    const driverId = req.user.driver_id;
    const { driver_username, driver_email, driver_password, status } = req.body;
  
    try {
      const updatedDriver = await DriverModel.updateDriver( driver_username, driver_email, driver_password,status,driverId);
  
      if (!updatedDriver) {
        return res.status(404).json({ error: 'Driver not found' });
      }
  
      res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getDriverOrders = async (req, res) => {
    const driver_id  = req.user.driver_id;
  
    try {
      const orders = await DriverModel.getDriverOrders(driver_id);
  
      res.status(200).json({
        message: 'Orders fetched successfully',
        data: orders,
      });
    } catch (error) {
      console.error('Error in getDriverOrders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getDriverHistory = async (req, res) => {
    const  driverId  = req.user.driver_id
  
    try {
        const orders = await DriverModel.getDriverHistory(driverId);
  
        res.status(200).json({
            message: 'Driver orders fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.error('Error in getDriverHistory controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  

module.exports = { registerDriver, loginDriver , getDriverInfo , updateDriver , getDriverOrders , getDriverHistory  };
