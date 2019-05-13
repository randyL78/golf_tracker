// dependencies
import express from 'express';

const router = express.Router();

// mock data to be replaced by MongoDB
const rounds = [
  {
    id: 1,
    course: 'Poplar Forest',
    score: [
      {
        hole: 1,
        shots: 4,
        par: 4,
        fairway: 'right',
        putts: 1
      },
      {
        hole: 2,
        shots: 7,
        par: 4,
        fairway: 'on',
        putts: 3
      },
      {
        hole: 3,
        shots: 5,
        par: 3,
        fairway: 'left',
        putts: 2
      },
      {
        hole: 4,
        shots: 8,
        par: 5,
        fairway: 'on',
        putts: 3
      },
      {
        hole: 5,
        shots: 5,
        par: 4,
        fairway: 'right',
        putts: 2
      },
      {
        hole: 6,
        shots: 4,
        par: 3,
        fairway: 'right',
        putts: 2
      },
      {
        hole: 7,
        shots: 7,
        par: 4,
        fairway: 'right',
        putts: 1
      },
      {
        hole: 8,
        shots: 7,
        par: 5,
        fairway: 'right',
        putts: 1
      },
      {
        hole: 9,
        shots: 6,
        par: 4,
        fairway: 'right',
        putts: 1
      },
    ]
  },
  {
    id: 2,
    course: 'Poplar Forest',
    score: [
      {
        hole: 1,
        shots: 4,
        par: 4,
        fairway: 'right',
        putts: 1
      },
      {
        hole: 2,
        shots: 7,
        par: 4,
        fairway: 'on',
        putts: 3
      },
      {
        hole: 3,
        shots: 5,
        par: 3,
        fairway: 'left',
        putts: 2
      },
      {
        hole: 4,
        shots: 8,
        par: 5,
        fairway: 'on',
        putts: 3
      },
      {
        hole: 5,
        shots: 5,
        par: 4,
        fairway: 'right',
        putts: 2
      },
      {
        hole: 6,
        shots: 4,
        par: 3,
        fairway: 'right',
        putts: 2
      },
      {
        hole: 7,
        shots: 7,
        par: 4,
        fairway: 'right',
        putts: 1
      },
      {
        hole: 8,
        shots: 7,
        par: 5,
        fairway: 'right',
        putts: 1
      },
      {
        hole: 9,
        shots: 6,
        par: 4,
        fairway: 'right',
        putts: 1
      },
    ]
  },
];

// main route
router.get('/', (req, res) => {
  res.send(`
    <h1>API for Golf Tracker App</h1>
    <p>Endpoints:</p>
    <ul>
      <li>/api/v1/rounds -GET</li>
    </ul>
  `);
});

// GET all rounds of golf
router.get('/rounds', (req, res) => {
  res.json(rounds);
});

// GET a round of golf by id
router.get('/round/:id', (req, res) => {
  const { params: { id } } = req;

  // use Array.find to isolate correct round. Be sure to convert req data to a number!
  const requestedRound = rounds.find(round => round.id === Number(id));

  // send selected round to client
  res.json(requestedRound);
})

export default router;
