// Dependencies
import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const ObjectId = Schema.Types.ObjectId;

// Define course schema
const courseSchema = new Schema({
  address: String,
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  city: String,
  state: String,
  zip: String,
  holes: [{
    type: ObjectId,
    ref: 'Hole'
  }]
});

// add slug before saving
courseSchema.pre('save', function (next) {
  this.slug = slug(this.name, { lower: 'on' });

  next();
});

// add holes array to model
courseSchema.methods.addHoles = function (holes) {
  this.holes = holes;

  return this.holes;
}

// Create the model
const Course = mongoose.model('Course', courseSchema);

export default Course;