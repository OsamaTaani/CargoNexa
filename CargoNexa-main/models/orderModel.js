// services/orderService.js
const { pool } = require('../db');

const createOrder = async (userId, orderData) => {
    const {
        name,
        receiver_name,
        shipping_location,
        receiver_location,
        reciving_timestamp,
        shipping_timestamp,
        order_truck_size,
        order_description,
        status,
        order_phone_number,
        receiver_phone_number,
        message,
        order_title,
        contains_dangerous_materials,
        shipping_date,
    } = orderData;

    const newOrder = await pool.query(
        'INSERT INTO orders (user_id, name, receiver_name, shipping_location, receiver_location, reciving_timestamp, shipping_timestamp, order_truck_size, order_description, status ,order_phone_number , receiver_phone_number , message , order_title , contains_dangerous_materials ,shipping_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ,$11 , $12 , $13 ,$14 , $15 , $16) RETURNING *'
        
        ,
        [userId, name, receiver_name, shipping_location, receiver_location, reciving_timestamp, shipping_timestamp, order_truck_size, order_description, status , order_phone_number , receiver_phone_number , message , order_title , contains_dangerous_materials , shipping_date ]
    );

    return newOrder.rows[0];
};

module.exports = {
    createOrder,
};
