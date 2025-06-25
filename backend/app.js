const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/V1/user.routes');
const RoomRoutes = require('./routes/V1/room.routes');
const CepRoutes = require('./routes/V1/cep.routes')
const errorHandler = require('./middlewares/ErrorHandler');
const authMiddleware = require('./middlewares/AuthMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Success');
});

app.use('/v1/users', UserRoutes);
app.use('/v1/api/cep', CepRoutes);
app.use('/v1/rooms', authMiddleware, RoomRoutes);


app.use(errorHandler);

module.exports = app;
