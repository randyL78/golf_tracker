// Dependencies
import express from 'express';
import authenticate from '../../middleware/authenticate';

// Model functions
import {
  findAllRounds, deleteRound, createRoundWithHoles
} from '../../models/round';

import { findHoleByRoundNumber, deleteRoundHoles, findHolesByRoundNumber } from '../../models/hole';

const router = express.Router();

// check for authentication in request header
router.use(authenticate);


// GET all rounds
router.get('/', (req, res) => {

  findAllRounds(rounds => {
    res.json(rounds);
  })
});

// GET all holes for a given round
// NOTE: used for testing in Postman
router.get('/round/:id/holes', (req, res) => {
  const { params: { id } } = req;

  findHolesByRoundNumber(id, (message, error = false) => {
    res.json({
      response: {
        message: message,
        error
      }
    });
  })
});

// POST new round
router.post('/round', (req, res) => {
  const { _id, course, holes, date } = req.body;

  createRoundWithHoles(_id, course, holes, (data, error = false) => {
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