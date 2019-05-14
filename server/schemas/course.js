// Dependencies
import mongoose, { Schema } from 'mongoose';

// Define course schema
const courseSchema = new Schema({
  address: String,
  name: { type: String, required: true },
  zip: { type: String, required: true }
});

export default courseSchema;