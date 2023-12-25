const { pool } = require('../db');

const getAllServicesDashboard = async (pageSize , offset , searchTerm) => {
  const services = await pool.query('SELECT * , COUNT (*) OVER () AS total_count FROM services WHERE services_title ILIKE $3 ORDER BY services_id LIMIT $1 OFFSET $2' , [pageSize , offset , `%${searchTerm}%`]);
  return services.rows;
};

const getAllServices = async () => {
  const services = await pool.query('SELECT * FROM services WHERE isdeleted = false' );
  return services.rows;
};

const getServiceById = async (serviceId) => {
  const service = await pool.query('SELECT * FROM services WHERE services_id = $1', [serviceId]);
  return service.rows[0];
};

const createService = async (services_title, services_description, services_image) => {
  const newService = await pool.query(
    'INSERT INTO services (services_title, services_description, services_image) VALUES ($1, $2, $3) RETURNING *',
    [services_title, services_description, services_image]
  );

  return newService.rows[0];
};

const updateServiceById = async (serviceId,updatedInfo ) => {

  const { services_title, services_description, services_image} = updatedInfo;

  const updatedService = await pool.query(
    'UPDATE services SET services_title = $1, services_description = $2, services_image = $3 WHERE services_id = $4 RETURNING *',
    [services_title, services_description, services_image, serviceId]
  );

  return updatedService.rows[0];
};

const deleteServiceById = async (serviceId) => {
  const deletedService = await pool.query('UPDATE services SET isdeleted = true WHERE services_id = $1 RETURNING *', [serviceId]);
  return deletedService.rows[0];
};

const undeleteServiceById = async (serviceId) => {
  const deletedService = await pool.query('UPDATE services SET isdeleted = false WHERE services_id = $1 RETURNING *', [serviceId]);
  return deletedService.rows[0];
};


module.exports = {
  getAllServicesDashboard,
  getServiceById,
  createService,
  updateServiceById,
  deleteServiceById,
  undeleteServiceById,
  getAllServices
};
