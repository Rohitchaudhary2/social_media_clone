import {Sequelize} from 'sequelize'
import {host, user, password, database} from '../../config/db.config.js'

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    logging: false
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  export default sequelize