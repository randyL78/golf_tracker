// dependencies
import express from 'express';

const router = express.Router();

// GET all courses' information
router.get('/', (req, res) => {
  res.send(`
    <h1>Information about all courses</h1>
  `);
});

//POST add new course information
router.post('/course/', (req, res) => {
  res.send(`
    <h1>Add new course information</h1>
  `);
});

// GET get specific course information by :id
router.get('/course/:id', (req, res) => {
  const { params: { id } } = req;
  res.send(`
    <h1>Information on course with id of ${id}</h1>
  `);
});

// PUT update specific course information by :id
router.put('/course/:id', (req, res) => {
  const { params: { id } } = req;
  res.send(`
    <h1>Updated information on course with id of ${id}</h1>
  `);
});

// Remove specific course information by :id
router.delete('/course/:id', (req, res) => {
  const { params: { id } } = req;
  res.send(`
    <h1>Removed course with id of: ${id}</h1>
  `);
});


export default router;