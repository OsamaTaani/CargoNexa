const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CargoNexa-V25',
  password: '549667',
  port: 5432,
});
module.exports = {
    pool,
};
