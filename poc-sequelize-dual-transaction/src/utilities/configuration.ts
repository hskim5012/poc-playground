module.exports = {
  dbConnection: {
    min: process.env.POOL_MIN || 50,
    max: process.env.POOL_MAX || 100,
    acquireTimeout: process.env.POOL_ACQUIRE_TIMEOUT || 5000,
    user: process.env.JFE_DB_USER,
    pass: process.env.JFE_DB_PASS,
    server: process.env.JFE_DB_SERVER,
    catalog: process.env.JFE_DB_CATALOG,
  },
  PPReports: {
    min: process.env.POOL_MIN || 50,
    max: process.env.POOL_MAX || 100,
    acquireTimeout: process.env.POOL_ACQUIRE_TIMEOUT || 5000,
    user: process.env.DB_USER_REPORTS,
    pass: process.env.DB_PASS_REPORTS,
    server: process.env.DB_SERVER_REPORTS,
    catalog: process.env.DB_CATALOG_REPORTS,
    port: parseInt(process.env.DB_PORT_REPORTS) || 1433,
  },
};
