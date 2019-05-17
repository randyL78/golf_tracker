// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Routes
import apiRoutes from './routes/api';

// Express entry point
const app = express();

// set our port to either a predetermined port number or 3001
app.set('port', process.env.PORT || 3001);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect Database
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

// Routes
app.use('/api', apiRoutes);

// Start server
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

export default app;