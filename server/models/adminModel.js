// models/adminModel.js

const {pool} = require('../db');

const bcrypt = require('bcrypt');

const createAdmin = async (admin_username , admin_password , admin_email , admin_phone_number) => {
  try{
    const role_id = 3;
    const hashedPassword = await bcrypt.hash(admin_password, 10); // Hash the password before storing


    const admin = await pool.query(
      'INSERT INTO admins (admin_username , admin_password , admin_email , admin_phone_number , role_id ) VALUES ($1, $2 , $3 , $4 , $5) RETURNING *' ,
      [admin_username , hashedPassword , admin_email , admin_phone_number , role_id]
    );
    return admin.rows[0];
    
  }catch(error) {
    console.error("Error in creating an admin",error);
    throw error;
  }
 

}
const getAdminByEmail = async (admin_email) => {
    const admin = await pool.query(
        'SELECT * FROM admins WHERE admin_email = $1',
        [admin_email]
    );

    return admin.rows[0];
};

const verifyCredentials = async(admin_email , admin_password) => {
    const admin = await getAdminByEmail(admin_email);

    if(admin && await admin_password, admin.admin_password) {
        return admin
    };
    return null;
}
const getAllAdmins = async (pageSize, offset , searchTerm) => {
    const admins = await pool.query('SELECT *, COUNT(*) OVER () AS total_count FROM admins WHERE admin_username ILIKE $3 ORDER BY admin_id LIMIT $1 OFFSET $2' , [pageSize, offset , `%${searchTerm}%`]);
    return admins.rows;
  };
  
  const getAdminById = async (adminId) => {
    const admin = await pool.query('SELECT * FROM admins WHERE admin_id = $1', [adminId]);
    return admin.rows[0];
  };
  
  const updateAdminById = async ( admin_username, admin_email, admin_phone_number , admin_password ,adminId) => {
    const updatedAdmin = await pool.query(
      'UPDATE admins SET admin_username = $1, admin_email = $2, admin_phone_number = $3 , admin_password = $4 WHERE admin_id = $5 RETURNING *',
      [admin_username, admin_email, admin_phone_number, admin_password, adminId ]
    );
  
    return updatedAdmin.rows[0];
  };
//Soft delete
  const deleteAdminById = async (adminId) => {
    const deletedAdmin = await pool.query(
      'UPDATE admins SET isDeleted = true WHERE admin_id = $1 RETURNING *',
      [adminId]
    );
  
    return deletedAdmin.rows[0];
  };

  const undeleteAdminById = async (adminId) => {
    const deletedAdmin = await pool.query(
      'UPDATE admins SET isDeleted = false WHERE admin_id = $1 RETURNING *',
      [adminId]
    );
  
    return deletedAdmin.rows[0];
  };


  
  module.exports = {
    getAdminByEmail,
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
    verifyCredentials,
    createAdmin,
    undeleteAdminById,
  };
  


