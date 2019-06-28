import slugify from 'slug';

// Import the schema
import Course from '../schemas/course';

// Import sub document model
import Hole from '../schemas/hole';

// find all courses
export function findAllCourses(callback) {
  Course.find({}, (error, courses) => {
    if (error) {
      console.error(error);
      return false;
    }

    callback(courses);
  })
}

// finds all of the course names and course ids for mapping to other docs
export function findAllCourseNames(callback) {
  Course.find({}, '_id name', (error, courses) => {
    if (error) {
      console.error(error);
      return false;
    }

    callback(courses);
  })
}

// find course id by name
export function findCourseId(name, callback) {
  Course.findOne({ name }, (error, course) => {
    callback(course._id);
  })
}

// find course by slug
export function findCourse(slug, callback) {
  Course.find({ slug }, (error, course) => {
    callback(error ? error : course);
  })
}

// create a new course
export function createCourse(name, address, city, state, zip, callback) {
  const newCourse = new Course({
    address,
    name,
    city,
    state,
    zip
  })

  // array to store all of the Hole ObjectIds
  const holes = [];

  // loop through the numberOfHole and create a new Hole 
  for (let i = 1; i <= 18; i++) {
    const hole = new Hole({
      number: i,
      // reference the round id to connect the holes to the rounds
      course: newCourse._id
    })

    // save each hole
    hole.save(function (err) {

      if (err) callback(err);
    });

    // add the Hole ObjectId to holes array
    holes.push(hole._id);
  }

  newCourse.addHoles(holes);

  newCourse.save(error => {
    if (error) {
      console.log(error)
      callback(error, true);
    } else {
      callback(newCourse);
    }
  })
}

// delete a course
export function deleteCourse(slug, callback) {

  // Use .deleteOne because .remove is deprecated
  Course.deleteOne({ slug }, error => {
    if (error) {
      callback(false, error);
    } else {
      callback(true);
    }
  })
}

// update a course
export function updateCourse(slug, name, address, city, state, zip, callback) {
  const updatedCourse = {
    slug: slugify(name, { lower: 'on' }),
    name,
    address,
    city,
    state,
    zip
  }
  // Use .updateOne because .update is deprecated
  Course.updateOne({ slug }, updatedCourse, (error, affected) => {
    if (error) {
      callback(error, false)
    } else {
      callback(affected, true)
    }
  })
}

