import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  const handleEdit = (courseIndex) => {
    navigate(`/editCourse/${courseIndex}`);
  };

  const handleDelete = (courseIndex) => {
    const updatedCourses = courses.filter((_, index) => index !== courseIndex);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>

      <h2 className="text-xl font-bold mb-2">Courses with Students and Teachers</h2>
      <table className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Course</th>
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">End Date</th>
            <th className="py-2 px-4 border">Students</th>
            <th className="py-2 px-4 border">Teachers</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses
            .filter(
              (course) =>
                course.students && course.students.length > 0 &&
                course.teachers && course.teachers.length > 0
            )
            .map((course, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{course.selectedCourse}</td>
                <td className="py-2 px-4 border">{course.startDate}</td>
                <td className="py-2 px-4 border">{course.endDate}</td>
                <td className="py-2 px-4 border">
                  {course.students.map((student, i) => (
                    <div key={i}>
                      {student.name} ({student.role})
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border">
                  {course.teachers.map((teacher, i) => (
                    <div key={i}>
                      {teacher.name} ({teacher.role})
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-2 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
