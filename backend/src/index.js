require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sessionRoutes = require('./routes/session');
const paymentRoutes = require('./routes/payment');

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: [
    'https://fire-auth-mcp.netlify.app', // Production frontend
    'http://localhost:5173',             // Local testing
    'http://localhost:5174',             // NovaFuze local testing
    'http://localhost:3000',             // Vite v6 default port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', sessionRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
