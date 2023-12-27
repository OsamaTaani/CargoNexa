// driverModel.js
const { pool } = require('../db');
const bcrypt = require('bcrypt');


const createDriver = async (
  driver_username,
  driver_email,
  driver_password,
  driver_license,
  truck_type,
  production_year,
  plate_number,
  driver_size_type
) => {
  const role_id = 2;
  const defaultStatus = 'Available';
  const hashedPassword = await bcrypt.hash(driver_password, 10);

  const query = `
    INSERT INTO drivers (
      driver_username, 
      driver_email, 
      driver_password, 
      driver_license,
      truck_type, 
      production_year, 
      plate_number, 
      driver_size_type, 
      role_id,
      status 
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  
    RETURNING *;
  `;

  const result = await pool.query(query, [
    driver_username,
    driver_email,
    hashedPassword,
    driver_license,
    truck_type,
    production_year,
    plate_number,
    driver_size_type,
    role_id,
    defaultStatus, 
  ]);

  return result.rows[0];
};


const getDriverByEmail = async (driver_email) => {
    const query = 'SELECT * FROM drivers WHERE driver_email = $1';
    const result = await pool.query(query, [driver_email]);
    console.log('Query Result:', result.rows);
  
    return result.rows[0];
  };
  
  const verifyDriverCredentials = async (driver_email, driver_password) => {
    const driver = await getDriverByEmail(driver_email);
  
    if (!driver) {
      return null; // User not found
    }
  
    const passwordMatch = await bcrypt.compare(driver_password, driver.driver_password);
    return passwordMatch ? driver : null;
  };


  const getDriverInfo = async (driverId) => {
    const driver = await pool.query('SELECT * FROM drivers WHERE driver_id = $1', [driverId]);
    console.log(driverId);
  
    return driver.rows[0];
  
  };
  
  const updateDriver = async ( driver_username, driver_email, driver_password,status,driverId) => {
    const updatedDriver = await pool.query(
      'UPDATE drivers SET driver_username = $1, driver_email = $2, driver_password = $3, status = $4 WHERE driver_id = $5  RETURNING *',
      [driver_username, driver_email, driver_password,status, driverId]
    );
  
    return updatedDriver.rows[0];
  };

  const getDriverOrders = async (driver_id) => {
    try {
      const result = await pool.query(
        'SELECT o.* FROM orders o JOIN order_driver_association a ON o.order_id = a.order_id WHERE a.driver_id = $1 AND o.status <> $2',
        [driver_id, 'Delivered']
      );
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error in getDriverOrders:', error);
      throw error;
    }
  };
  
  const getDriverHistory = async (driverId) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE driver_id = $1 AND isdeleted = false', [driverId]);
        return result.rows;
    } catch (error) {
        console.error('Error in getUserOrders:', error);
        throw error;
    }
  };

  

  
//   const verifyDriverCredentials = async (email, password) => {
//     const driver = await getDriverByEmail(email);
  
//     if (!driver) {
//       console.log('Driver not found');
//       return null; // Driver not found
//     }
  
//     console.log('Stored hashed password in the database:', driver.driver_password);
    
//     const passwordMatch = await bcrypt.compare(password, driver.driver_password);
//     console.log('Password provided in the login attempt:', password);
//     console.log('Password match:', passwordMatch);
  
//     return passwordMatch ? driver : null;
//   };
    
  

module.exports = { createDriver, getDriverByEmail , verifyDriverCredentials , getDriverInfo , updateDriver , getDriverOrders , getDriverHistory};
