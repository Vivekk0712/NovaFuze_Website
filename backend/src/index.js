require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const sessionRoutes = require('./routes/session');
const paymentRoutes = require('./routes/payment');

const app = express();
const port = process.env.PORT || 4000;

// Allowed frontend URLs
const allowedOrigins = [
  'https://novafuze.in',
  'https://www.novafuze.in',
  'https://fire-auth-mcp.netlify.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

// Correct CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, server-to-server, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS')); // proper error
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

// Apply CORS to all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight requests

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', sessionRoutes);
app.use('/api/payment', paymentRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
