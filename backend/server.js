require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3001;

(async () => {
  try {

    console.log('Connecting to DB with:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

    await sequelize.authenticate();
    console.log('Connection Success');

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server connected on PORT:${PORT}`);
    });
  } catch (error) {
    console.error('Error to connect no Database', error);
  }
})();
