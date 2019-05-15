// Dependencies
import mongoose, { Schema } from 'mongoose';

// Define course schema
const courseSchema = new Schema({
  address: String,
  name: { type: String, required: true, unique: true },
  zip: { type: String, required: true }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;