const env = process.env;

const config = {
  db: { 
    host: env.DB_HOST || '127.0.0.1',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || 'postgres',
    database: env.DB_NAME || 'accounts',
  }
};

module.exports = config;