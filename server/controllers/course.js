// Import the schema
import Course from '../models/course';


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
export function findCourse(id, callback) {
  Course.find({ _id: id }, (error, course) => {
    if (error) {
      console.error(error);
      callback(error);
    }
    callback(course);
  })
}

// create a new course
export function createCourse(name, address, zip, callback) {
  const newCourse = new Course({
    address,
    name,
    zip
  })

  newCourse.save(error => {
    if (error) {
      console.log(error)
      callback(error, true);
    } else {
      console.log('Course saved correctly');
      callback(newCourse);
    }
  })
}

// delete a course
export function deleteCourse(id, callback) {

  // Use .deleteOne because .remove is deprecated
  Course.deleteOne({ _id: id }, error => {
    if (error) {
      callback(false, error);
    } else {
      callback(true);
    }
  })
}

// update a course
export function updateCourse(id, name, address, zip, callback) {
  const updatedCourse = {
    name,
    address,
    zip
  }
  // Use .updateOne because .update is deprecated
  Course.updateOne({ _id: id }, updatedCourse, (error, affected) => {
    if (error) {
      callback(error, false)
    } else {
      callback(affected, true)
    }
  })
}

