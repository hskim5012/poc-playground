'use strict';

import { Sequelize } from 'sequelize';
let config = require('../utilities/configuration');

export const PPBankingSequelize: Sequelize = new Sequelize(
  config.dbConnection.catalog,
  config.dbConnection.user,
  config.dbConnection.pass,
  {
    host: config.dbConnection.server,
    dialect: 'mssql',
    port: config.PPReports.port || 1433,
    logging: (...msg) => console.log(msg),
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);

export const PPReportsSequelize: Sequelize = new Sequelize(
  config.PPReports.catalog,
  config.PPReports.user,
  config.PPReports.pass,
  {
    host: config.PPReports.server,
    dialect: 'mssql',
    port: config.PPReports.port || 1433,
    logging: (...msg) => console.log(msg),
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);
