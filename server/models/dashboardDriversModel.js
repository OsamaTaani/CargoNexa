const {pool} = require('../db');
const bcrypt = require('bcrypt');


const addDriver = async (
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
const getAllDrivers = async (pageSize , offset , searchTerm) => {
  try{
    const query = `
      SELECT * , COUNT (*) OVER () AS total_count
      FROM drivers
      WHERE
        driver_username ILIKE $3 OR
        driver_license ILIKE $3 OR
        production_year::TEXT ILIKE $3 OR  
        plate_number ILIKE $3 OR
        driver_size_type ILIKE $3 OR
        status ILIKE $3
      ORDER BY driver_id
      LIMIT $1 OFFSET $2`;
              
    const driver = await pool.query(query ,[pageSize , offset , `%${searchTerm}%`]);
    return driver.rows;           
  }catch  (error) {
    console.error('Error in get all drivers:', error);
    throw error;
  }
};
  


const getDriversCount = async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM drivers WHERE isdeleted = false');
    const count = result.rows[0].count;
    return count;
  } catch (error) {
    throw error;
  }
};


const getDriverById = async (driverId) => {
  const driver = await pool.query('SELECT * FROM drivers WHERE driver_id = $1', [driverId]);
  console.log(driverId);

  return driver.rows[0];

};

const updateDriverById = async ( driver_username, driver_email,driver_license, truck_type,production_year,plate_number,driver_size_type,status,driverId) => {
  const updatedDriver = await pool.query(
    'UPDATE drivers SET driver_username = $1, driver_email = $2, driver_license = $3, truck_type = $4 , production_year = $5 ,plate_number = $6 , driver_size_type = $7 , status = $8  WHERE driver_id = $9  RETURNING *',
    [driver_username, driver_email, driver_license,truck_type ,production_year , plate_number , driver_size_type ,status, driverId]
  );

  return updatedDriver.rows[0];
};

const deleteDriverById = async (driverId) => {
  const deletedDriver = await pool.query('UPDATE drivers SET isdeleted = true WHERE driver_id = $1 RETURNING *', [driverId]);
  return deletedDriver.rows[0];
};

const undeleteDriverById = async (driverId) => {
  const deletedDriver = await pool.query('UPDATE drivers SET isDeleted = false WHERE driver_id = $1 RETURNING *', [driverId]);
  return deletedDriver.rows[0];
};


module.exports = {
  getAllDrivers,
  getDriverById,
  updateDriverById,
  deleteDriverById,
  addDriver,
  undeleteDriverById,
  getDriversCount
};

