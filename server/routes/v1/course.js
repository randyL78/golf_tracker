// dependencies
import express from 'express';

// controllers
import { createCourse, findAllCourses, findCourse } from '../../controllers/course';

const router = express.Router();

// GET all courses' information
router.get('/', (req, res) => {
  findAllCourses(courses => {
    res.json(courses);
  })
});

//POST add new course information
router.post('/course/', (req, res) => {
  const { name, address, zip } = req.body;
  console.log(name, address, zip);
  createCourse(name, address, zip, (data, error = false) => {
    res.json({
      response: {
        message: data,
        saved: !error
      }
    });
  })
});

// GET get specific course information by :id
router.get('/course/:id', (req, res) => {
  const { params: { id } } = req;
  findCourse(id, courses => {
    res.json(courses);
  })
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