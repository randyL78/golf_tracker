// Dependencies
import express from 'express';

// Model functions
import {
  createHole,
  findAllHoles,
  findHoleById,
  findHolesByCourse,
  deleteHole,
  updateHole
} from '../../models/hole';

const router = express.Router();

// GET all holes
router.get('/', (req, res) => {

  findAllHoles(holes => {
    res.json(holes);
  })
});

// GET a hole by id
router.get('/hole/:id', (req, res) => {
  const { params: { id } } = req;

  findHoleById(id, (data, error = false) => {
    res.json({
      response: {
        message: data,
        saved: !error
      }
    });
  })
});

// GET holes by course
router.get('/course/:id', (req, res) => {
  const { params: { id } } = req;

  findHolesByCourse(id, (data, error = false) => {
    res.json({
      response: {
        message: data,
        saved: !error
      }
    });
  })
});

// POST a new hole
router.post('/hole', (req, res) => {
  const { number, par, strokes, putts, fairway } = req.body;

  createHole(number, par, strokes, putts, fairway, (data, error = false) => {
    res.json({
      response: {
        message: data,
        saved: !error
      }
    });
  })
});

// Delete a hole
router.delete('/hole/:id', (req, res) => {
  const { params: { id } } = req;

  deleteHole(id, (data, error = false) => {
    res.json({
      response: {
        message: data,
        deleted: !error
      }
    });
  })

});

router.put('/hole/:id', (req, res) => {
  const { params: { id }, body: { number, par, strokes, putts, fairway, round, course } } = req;

  updateHole(id, number, par, strokes, putts, fairway, round, course, (message, updated) => {
    res.json({
      message,
      updated
    });
  });
});

export default router;