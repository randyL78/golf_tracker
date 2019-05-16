// Import the schema
import Hole from '../schemas/hole';

// find all holes
// NOTE: Used for testing only!!!!
export function findAllHoles(callback) {
  Hole.find({}, (error, holes) => {
    if (error) {
      return false
    }
    callback(holes);
  });
}

// find hole by id
export function findHoleById(id, callback) {
  Hole.findById(id, (error, hole) => {
    if (error) {
      callback(error, true);
    } else {
      callback(hole);
    }
  });
}

// create a new hole
export function createHole(number, par, strokes, putts, fairway, callback) {
  const newHole = new Hole({
    number,
    par,
    strokes,
    putts,
    fairway
  });

  newHole.save(error => {
    if (error) {
      callback(error, true)
    } else {
      callback(newHole, false);
    }
  })

}

// delete a hole
export function deleteHole(id, callback) {
  Hole.findByIdAndDelete(id, (error, data) => {
    if (error) {
      callback(error, true);
    } else {
      callback(data);
    }
  })
}

// update a hole
export function updateHole(id, number, par, strokes, putts, fairway, callback) {
  const updatedHole = {
    number,
    par,
    strokes,
    putts,
    fairway
  };

  Hole.updateOne({ _id: id }, updatedHole, (error, hole) => {
    if (error) {
      callback(error, false)
    } else {
      callback(hole, true)
    }
  })
}