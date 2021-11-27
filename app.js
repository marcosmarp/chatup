const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require ('dotenv/config');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["https://retro-chatup.herokuapp.com/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Routes
app.use(routes);

// DB
mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () => {
  console.log('Connected to the database');
})

// Static files
if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static('client/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000);
