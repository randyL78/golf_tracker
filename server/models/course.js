// Import the schema
import Course from '../schemas/course';


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

// find course by id
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

