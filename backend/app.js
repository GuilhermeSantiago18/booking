const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/user.routes')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Success');
});

app.use('/users', UserRoutes)



module.exports = app;
