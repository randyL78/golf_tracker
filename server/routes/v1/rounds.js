// Dependencies
import express from 'express';

// Model functions
import {
  findAllRounds, createRound, deleteRound
} from '../../models/round';

import { findHoleByRoundNumber, deleteRoundHoles } from '../../models/hole';

const router = express.Router();

// GET all rounds
router.get('/', (req, res) => {

  findAllRounds(rounds => {
    res.json(rounds);
  })
});

// POST new round
router.post('/round', (req, res) => {

  const { courseId, numberOfHoles } = req.body;

  createRound(courseId, numberOfHoles, (data, error = false) => {
    res.json({
      response: {
        message: data,
        saved: !error
      }
    });
  })
});

// Delete a round
router.delete('/round/:id', (req, res) => {

  const { params: { id } } = req;

  deleteRound(id, (message, error = false) => {

    deleteRoundHoles(id, (holeMessage, holeError = false) => {
      res.json({
        response: {
          message: message + ' ' + holeMessage,
          deleted: !error && !holeError
        }
      });

    });
  });
});

// Get a specific hole in a round
router.get('/round/:id/:hole', (req, res) => {

  const { params: { id, hole } } = req;

  findHoleByRoundNumber(id, hole, (message, error = false) => {
    res.json({
      response: {
        message,
        found: !error
      }
    });
  });

});

export default router;