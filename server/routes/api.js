// dependencies
import express from 'express';

// import version routes
import v1Routes from './v1/v1';

const router = express.Router();

// main route
router.get('/', (req, res) => {
  res.send(
    `<h1>API version endpoints</h1>
     <ul>
      <li>version 1: api/v1/</li>
     </ul>
    `
  );
});



// version 1 routes
router.use('/v1', v1Routes);

export default router;
