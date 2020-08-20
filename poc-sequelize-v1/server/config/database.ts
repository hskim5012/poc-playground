import { Sequelize } from 'sequelize';

export const SequelizeConnection = new Sequelize('DevDB', 'dwebd1admin', 'Fossil50!', {
    host: 'dwebd1.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true
        }
    },
    define: {
        timestamps: false
    }
});

SequelizeConnection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });