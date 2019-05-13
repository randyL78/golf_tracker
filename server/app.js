// Dependencies
import express from 'express';
import bodyParser from 'body-parser';

// Controllers
import apiController from './controllers/api';

// Global variables
const port = 8080;

// Express entry point
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', apiController);

// Start server
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

export default app;