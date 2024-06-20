const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/events');
const schoolRoutes = require('./routes/schools');
const headmasterRoutes = require('./routes/headmasters');
const teacherRoutes = require('./routes/teachers');
const studentsRoutes = require('./routes/students');
const classRoutes = require('./routes/classes');
const plansRouter = require('./routes/plans');
const rapportsRouter = require('./routes/rapports');
const notesRouter = require('./routes/notes');
const errorsRouter = require('./routes/Errors');
const examsRouter = require('./routes/exams');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/headmasters', headmasterRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/plans', plansRouter);
app.use('/api/rapports', rapportsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/errors', errorsRouter);
app.use('/api/exams', examsRouter);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Connection error', err.message);
});

module.exports = app;
