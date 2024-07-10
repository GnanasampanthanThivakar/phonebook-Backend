const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const phoneBookRoutes = require('./routes/phoneBookRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const DB = process.env.DB;

// List of allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      callback(new Error(msg), false);
    }
  }
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected..');
}).catch((err) => {
  console.error('Database connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Welcome to the PhoneBook API');
});

app.use('/api', phoneBookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}..`);
});
