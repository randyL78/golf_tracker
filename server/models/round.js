// dependencies
import shortid from 'shortid';
import uuid from 'uuidv4';

// Import the schema
import Round from '../schemas/round';

// Import sub document model
import Hole from '../schemas/hole';

// find all rounds
export function findAllRounds(callback) {
  Round
    .find({})
    .populate('course')
    .populate('holes')
    .exec((err, rounds) => {
      callback(rounds)
    })

}

// create a round with holes already supplied and date played created
export function createRoundWithHoles(id, course, roundHoles, callback) {
  const newRound = new Round({
    _id: id || shortid.generate(),
    course: course._id,
  })

  // array to store all of the Hole ObjectIds
  const holes = [];

  // loop through the round holes and create a new Hole 
  roundHoles.forEach(({ number, strokes, par, putts, fairway }) => {
    const hole = new Hole({
      // break down the hole object because the id will have to be overwritten
      id: uuid(),
      number,
      par,
      strokes,
      putts,
      fairway,
      // reference the round id to connect the holes to the rounds
      round: newRound._id
    })

    hole.save(function (err, data) {
      if (err) console.log(err)
    });

    holes.push(hole._id);
  });

  // add the hole ids to the round to connect the two
  newRound.addHoles(holes);

  // save the round to the DB
  newRound.save(err => {
    if (err) callback(err);
  })

  callback(newRound);

}



// create a round
export function createRound(courseId, numberOfHoles, callback) {

  // create a new round
  const newRound = new Round({
    _id: shortid.generate(),
    course: courseId
  }

  );

  // array to store all of the Hole ObjectIds
  const holes = [];

  // loop through the numberOfHole and create a new Hole 
  for (let i = 1; i <= numberOfHoles; i++) {
    const hole = new Hole({
      number: i,
      // reference the round id to connect the holes to the rounds
      round: newRound._id
    })

    // save each hole
    hole.save(function (err) {

      if (err) callback(err);
    });

    // add the Hole ObjectId to holes array
    holes.push(hole._id);
  }

  // add the hole ids to the round to connect the two
  newRound.addHoles(holes);

  // save the round to the DB
  newRound.save(err => {

    if (err) callback(err);
  })
  callback(newRound);
}

// delete a round
export function deleteRound(id, callback) {
  Round.findByIdAndDelete(id, (error, data) => {
    if (error) {
      callback(error, true);
    } else {
      callback(data);
    }
  })
}