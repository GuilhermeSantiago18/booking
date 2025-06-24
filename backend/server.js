require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection Success');

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server connected http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error to connect no Database', error);
  }
})();
