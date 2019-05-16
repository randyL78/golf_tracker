// Dependencies
import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

// SubDocuments
import Hole from './hole';

// Define round schema
const roundSchema = new Schema({
  course: ObjectId,
  holes: [Hole.model],
});

//  Create the Round model
const Round = mongoose('Round', roundSchema);

export default Round;