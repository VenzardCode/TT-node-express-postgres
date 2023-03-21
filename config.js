const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || '127.0.0.1',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || '4y7sV96vA9wv46VR',
    database: env.DB_NAME || 'accounts',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;