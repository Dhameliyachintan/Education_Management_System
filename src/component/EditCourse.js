import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditCourse() {
  const { courseIndex } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enrollment, setEnrollment] = useState(0);
  const [progress, setProgress] = useState(0);
  const [grades, setGrades] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const courseData = storedCourses[courseIndex];
    if (courseData) {
      setCourse(courseData);
      setSelectedCourse(courseData.selectedCourse);
      setDescription(courseData.description);
      setStartDate(courseData.startDate);
      setEndDate(courseData.endDate);
      setEnrollment(courseData.enrollment);
      setProgress(courseData.progress);
      setGrades(courseData.grades.join(", "));
      setStudents(courseData.students);
      setTeachers(courseData.teachers);
      setAssignments(courseData.assignments || []);
    } else {
      navigate("/adminDashboard");
    }
  }, [courseIndex, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCourse || !description || !startDate || !endDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date must be before end date.");
      return;
    }

    const updatedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const updatedCourse = {
      selectedCourse,
      description,
      startDate,
      endDate,
      enrollment,
      progress,
      grades: grades.split(",").map((grade) => grade.trim()),
      students,
      teachers,
      assignments,
    };

    updatedCourses[courseIndex] = updatedCourse;
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    toast.success("Course updated successfully!");
    navigate("/adminDashboard");
  };

  const updateAssignment = (index, value) => {
    const newAssignments = [...assignments];
    newAssignments[index] = value;
    setAssignments(newAssignments);
  };

  const handleStudentChange = (index, name) => {
    const newStudents = [...students];
    newStudents[index].name = name;
    setStudents(newStudents);
  };

  const handleTeacherChange = (index, name) => {
    const newTeachers = [...teachers];
    newTeachers[index].name = name;
    setTeachers(newTeachers);
  };

  if (!course) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Course:</label>
          <input
            type="text"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Enrollment:</label>
          <input
            type="number"
            value={enrollment}
            onChange={(e) => setEnrollment(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Progress (%):</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
            min="0"
            max="100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Grades (comma-separated):</label>
          <input
            type="text"
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Assignments:</h3>
          {assignments.map((assignment, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={assignment}
                onChange={(e) => updateAssignment(index, e.target.value)}
                className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Students:</h3>
          {students.map((student, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={student.name}
                onChange={(e) => handleStudentChange(index, e.target.value)}
                placeholder="Student Name"
                className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Teachers:</h3>
          {teachers.map((teacher, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={teacher.name}
                onChange={(e) => handleTeacherChange(index, e.target.value)}
                placeholder="Teacher Name"
                className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}
