const { pool } = require('../db');

const getServices = async () => {
    const result = await pool.query('SELECT * FROM services WHERE isdeleted = false');
    const servicesData = result.rows;
    
    return servicesData;
  };
  
  const addService = async (service) => {
    const { services_title, services_description, services_image } = service;
    const result = await pool.query(
      'INSERT INTO services (services_title, services_description, services_image) VALUES ($1, $2, $3) RETURNING *',
      [services_title, services_description, services_image]
    );
    const newService = result.rows[0];
    return newService;
  };
  
  const updateService = async (services_id, service) => {
    const { services_title, services_description, services_image } = service;
    const result = await pool.query(
      'UPDATE services SET services_title=$1, services_description=$2, services_image=$3 WHERE id=$4 AND isdeleted=false RETURNING *',
      [services_title, services_description, services_image, services_id]
    );
    const updatedService = result.rows[0];
    return updatedService;
  };
  
  const softDeleteService = async (id) => {
    const result = await pool.query(
      'UPDATE services SET is_deleted=true WHERE id=$1 AND isdeleted=false RETURNING *',
      [id]
    );
    const deletedService = result.rows[0];
    return deletedService;
  };
  
  module.exports = {
    getServices,
    addService,
    updateService,
    softDeleteService,
  };
  