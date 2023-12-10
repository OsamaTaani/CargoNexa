const { pool } = require('../db');

const getAllServices = async (pageSize , offset) => {
  const services = await pool.query('SELECT * , COUNT (*) OVER () AS total_count FROM services ORDER BY services_id LIMIT $1 OFFSET $2' , [pageSize , offset]);
  return services.rows;
};

const getServiceById = async (serviceId) => {
  const service = await pool.query('SELECT * FROM services WHERE service_id = $1', [serviceId]);
  return service.rows[0];
};

const createService = async (services_title, services_description, services_image) => {
  const newService = await pool.query(
    'INSERT INTO services (services_title, services_description, services_image) VALUES ($1, $2, $3) RETURNING *',
    [services_title, services_description, services_image]
  );

  return newService.rows[0];
};

const updateServiceById = async (serviceId, services_title, services_description, services_image) => {
  const updatedService = await pool.query(
    'UPDATE services SET services_title = $1, services_description = $2, services_image = $3 WHERE services_id = $4 RETURNING *',
    [services_title, services_description, services_image, serviceId]
  );

  return updatedService.rows[0];
};

const deleteServiceById = async (serviceId) => {
  const deletedService = await pool.query('DELETE FROM services WHERE service_id = $1 RETURNING *', [serviceId]);
  return deletedService.rows[0];
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteServiceById,
};
