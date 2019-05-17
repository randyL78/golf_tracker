// Dependencies
import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

// SubDocuments
import Hole from './hole';

// Define round schema
const roundSchema = new Schema({
  _id: ObjectId,
  course: {
    type: ObjectId,
    ref: 'Course'
  },
  datePlayed: Date,
  holes: [{
    type: ObjectId,
    ref: 'Hole'
  }],
});

// add holes array to model
roundSchema.methods.addHoles = function (holes) {
  this.holes = holes;

  return this.holes;
}

// create Date before saved
roundSchema.pre('save', function (next) {
  this.datePlayed = Date.now();

  next();
})

//  Create the Round model
const Round = mongoose.model('Round', roundSchema);

export default Round;