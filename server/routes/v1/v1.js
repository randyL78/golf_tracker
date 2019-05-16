// dependencies
import express from 'express';

// sub routes
import courseRoutes from './course';
import holeRoutes from './hole';

const router = express.Router();

// main route, display endpoints
router.get('/', (req, res) => {
  res.send(`
    <h1>API for Golf Tracker App</h1>
    <p>Endpoints:</p>
    <ul>
      <li>/api/v1/courses -GET, POST</li>
    </ul>
  `);
});

// course routes
router.use('/courses', courseRoutes);

// hole routes
router.use('/holes', holeRoutes);


export default router;