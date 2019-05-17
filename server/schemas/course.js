// Dependencies
import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

// Define course schema
const courseSchema = new Schema({
  address: String,
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  zip: { type: String, required: true }
});

// add slug before saving
courseSchema.pre('save', function (next) {
  this.slug = slug(this.name, { lower: 'on' });

  next();
});

// Create the model
const Course = mongoose.model('Course', courseSchema);

export default Course;