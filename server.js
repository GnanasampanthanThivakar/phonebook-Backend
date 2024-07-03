// backend/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const phoneBookRoutes = require('./routes/phoneBookRoutes'); // Correct relative path

const app = express();
const PORT = 8080;
const DB = "mongodb+srv://gthivakar123:200052295@olex.l0to07k.mongodb.net/olex";

app.use(express.json());
app.use(cors());

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected..');
}).catch((err) => {
    console.error('Database connection error:', err);
});

app.use('/api', phoneBookRoutes); // Mount phoneBookRoutes under /api prefix

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}..`);
});


