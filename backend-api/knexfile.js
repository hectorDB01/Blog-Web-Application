require('dotenv').config();
const {DB_USER, DB_PASS, DB_NAME } = process.env;

/**
* @type { import("knex").Knex.Config }
*/

module.exports = {
    client: 'mysql2',
    connection: {
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
  },

  pool: { 
    min: 0, 
    max: 10 
  },

  seeds: {
    directory: './seeds',
  },
};