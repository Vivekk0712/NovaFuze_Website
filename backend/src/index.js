require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sessionRoutes = require('./routes/session');
const paymentRoutes = require('./routes/payment');

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://novafuze.in',
      'https://www.novafuze.in',
      'https://fire-auth-mcp.netlify.app',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
    ];
    
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      // Don't throw error, just reject
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
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
