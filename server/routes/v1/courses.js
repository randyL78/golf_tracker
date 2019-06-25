// Dependencies
import express from 'express';

// Model functions
import {
  createCourse,
  findAllCourses,
  findCourse,
  deleteCourse,
  updateCourse
} from '../../models/course';

const router = express.Router();

// GET all courses' information
router.get('/', (req, res) => {
  findAllCourses(courses => {
    res.json(courses);
  })
});

//POST add new course information
router.post('/course/', (req, res) => {
  const { name, address, city, state, zip } = req.body;
  createCourse(name, address, city, state, zip, (data, error = false) => {
    res.json({
      response: {
        message: data,
        saved: !error
      }
    });
  })
});

// GET get specific course information by :id
router.get('/course/:slug', (req, res) => {
  const { params: { slug } } = req;
  findCourse(slug, courses => {
    res.json(courses);
  })
});

// PUT update specific course information by :id
router.put('/course/:slug', (req, res) => {
  const { params: { slug }, body: { name, address, city, state, zip } } = req;
  updateCourse(slug, name, address, city, state, zip, (message, updated) => {
    res.json({
      message,
      updated
    });
  })
});

// Remove specific course information by :id
router.delete('/course/:slug', (req, res) => {
  const { params: { slug } } = req;
  deleteCourse(slug, (removed, error) => {
    if (removed) {
      res.json({
        response: {
          removed
        }
      });
    } else {
      res.json({
        response: {
          removed,
          message: error
        }
      });
    }
  })
});


export default router;