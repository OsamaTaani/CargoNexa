const {pool} = require('../db');

const getAllDrivers = async (pageSize , offset) => {
  const drivers = await pool.query('SELECT * , COUNT (*) OVER () AS total_count FROM drivers ORDER BY driver_id LIMIT $1 OFFSET $2' , [pageSize , offset]);
  return drivers.rows;           
};

const getDriverById = async (driverId) => {
  const driver = await pool.query('SELECT * FROM drivers WHERE driver_id = $1', [driverId]);
  console.log(driverId);

  return driver.rows[0];

};

const updateDriverById = async ( driver_username, driver_email, driver_password, status,driverId) => {
  const updatedDriver = await pool.query(
    'UPDATE drivers SET driver_username = $1, driver_email = $2, driver_password = $3,  status = $4 WHERE driver_id = $5  RETURNING *',
    [driver_username, driver_email, driver_password, status, driverId]
  );

  return updatedDriver.rows[0];
};

const deleteDriverById = async (driverId) => {
  const deletedDriver = await pool.query('UPDATE drivers SET isDeleted = true WHERE driver_id = $1 AND isDeleted = false RETURNING *', [driverId]);
  return deletedDriver.rows[0];
};

module.exports = {
  getAllDrivers,
  getDriverById,
  updateDriverById,
  deleteDriverById,
};
