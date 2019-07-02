// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'express-pino-logger';

// Routes
import apiRoutes from './routes/api';

// Express entry point
const app = express();

// Enable CORS for all routes
app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

// set our port to either a predetermined port number or 3001
app.set('port', process.env.PORT || 3001);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable console logging of HTTP requests in development
app.use(logger());

const pass = encodeURIComponent('golfapp');

// Connect Database
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://golfapp:' + pass + '@golftracker-v1-yo2ao.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

// Routes
app.use('/api', apiRoutes);

// global error handler
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// Start server
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

export default app;