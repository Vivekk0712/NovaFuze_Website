require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sessionRoutes = require('./routes/session');

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', sessionRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});