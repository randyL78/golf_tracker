// Dependencies
import mongoose, { Schema } from 'mongoose';

// Define Hole schema
const holeSchema = new Schema({
  number: {
    type: Number,
    required: true,
    min: 1,
    max: 18
  },
  par: {
    type: Number,
    min: 3,
    max: 7,
    default: 4
  },
  strokes: {
    type: Number,
    min: 1,
    max: 14,
    default: 4
  },
  putts: {
    type: Number,
    min: 0,
    max: 13,
    default: 2
  },
  fairway: {
    type: String,
    enum: ['right', 'left', 'short', 'onTarget'],
    default: 'onTarget'
  }
});

// Create the hole model
const Hole = mongoose.model('Hole', holeSchema);

export default Hole;
