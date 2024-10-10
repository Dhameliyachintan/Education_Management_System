import React, { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Teacher Dashboard</h1>

      <h2 className="text-xl font-bold mb-2">Assigned Courses</h2>
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Course</th>
            <th className="py-2 px-4 border">Progress (%)</th>
            <th className="py-2 px-4 border">Grades</th>
            <th className="py-2 px-4 border">Students</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{course.selectedCourse}</td>
              <td className="py-2 px-4 border">{course.progress}%</td>
              <td className="py-2 px-4 border">{course.grades}%</td>
              <td className="py-2 px-4 border">
                {course.students && course.students.length > 0
                  ? course.students.map((student, i) => (
                      <div key={i}>
                        {student.name} ({student.role})
                      </div>
                    ))
                  : "No students enrolled"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
