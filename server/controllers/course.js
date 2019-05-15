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
  Course.deleteOne({ _id: id }, error => {
    if (error) {
      callback(false, error);
    } else {
      callback(true);
    }
  })
}

