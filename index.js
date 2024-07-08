const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const phoneBookRoutes = require('./routes/phoneBookRoutes');

const app = express();
const PORT = 8080;
const DB = "mongodb+srv://gthivakar123:200052295@olex.l0to07k.mongodb.net/olex";

// List of allowed origins
const allowedOrigins = [
  'https://phonebook-frontend-two.vercel.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
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
