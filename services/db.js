const { Pool } = require('pg');
const config = require('../config');
const pool = new Pool(config.db);

/**
 * Query the database using the pool
 * @param {string} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 */
async function query(query, params) {
  const { rows, rowCount } = await pool.query(query, params);

  return { rows, rowCount };
}

module.exports = {
  query
}