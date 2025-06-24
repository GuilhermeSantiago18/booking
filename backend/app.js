const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/user.routes');
const RoomRoutes = require('./routes/room.routes');
const errorHandler = require('./middlewares/ErrorHandler');
const authMiddleware = require('./middlewares/AuthMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Success');
});

app.use('/users', UserRoutes);
app.use('/rooms', authMiddleware, RoomRoutes);

app.use(errorHandler);

module.exports = app;
