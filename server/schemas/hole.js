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
    default: null
  },
  putts: {
    type: Number,
    min: 0,
    max: 13,
    default: null
  },
  fairway: {
    type: String,
    enum: ['right', 'left', 'short', 'onTarget', null],
    default: null
  },
  round: {
    type: Schema.Types.ObjectId,
    ref: 'Round'
  }
});

// Create the hole model
const Hole = mongoose.model('Hole', holeSchema);

export default Hole;
