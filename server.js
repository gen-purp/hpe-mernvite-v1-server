require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Health checks
app.get('/', (_req, res) => res.send('Horsepower Electrical API running'));
app.get('/health', (_req, res) => res.send('ok'));   // add this

// Start
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';         // add this
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, HOST, () =>
    console.log(`🚀 Server listening on http://${HOST}:${PORT}`)
  );
});





// require('dotenv').config();
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const connectDB = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const leadRoutes = require('./routes/leadRoutes');

// const app = express();

// // Middleware
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }));

// // Health check
// app.get('/', (_req, res) => res.send('Horsepower Electrical API running'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/leads', leadRoutes);

// // Start
// const PORT = process.env.PORT || 5000;
// connectDB(process.env.MONGO_URI).then(() => {
//   app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
// });
