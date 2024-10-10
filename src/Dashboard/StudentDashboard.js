import React, { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
    const storedEnrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    setEnrolledCourses(storedEnrolledCourses);
  }, []);

  const handleEnroll = (courseName) => {
    if (!enrolledCourses.includes(courseName)) {
      const updatedEnrolledCourses = [...enrolledCourses, courseName];
      setEnrolledCourses(updatedEnrolledCourses);
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolledCourses)); 
    }
  };

  const getStudentData = () => {
    return courses.filter(course => enrolledCourses.includes(course.selectedCourse)).map(course => ({
      courseName: course.selectedCourse,
      assignments: course.assignments || [],
      grades: course.grades || [],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Student Dashboard</h1>

      <h2 className="text-xl font-bold mb-2">Available Courses</h2>
      <ul className="mb-4">
        {courses.map((course, index) => (
          <li key={index} className="flex justify-between py-2">
            <span>{course.selectedCourse}</span>
            <button
              onClick={() => handleEnroll(course.selectedCourse)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Enroll
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-2">Enrolled Courses, Progress, and Grades</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Course</th>
            <th className="py-2 px-4 border">Assignments</th>
            <th className="py-2 px-4 border">Grades</th>
          </tr>
        </thead>
        <tbody>
          {getStudentData().map((data, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{data.courseName}</td>
              <td className="py-2 px-4 border">
                {data.assignments.length > 0 ? data.assignments.join(', ') : 'No assignments'}
              </td>
              <td className="py-2 px-4 border">
                {data.grades.length > 0 ? data.grades.join(', ') : 'No grades'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
