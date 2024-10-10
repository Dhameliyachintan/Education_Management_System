import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CourseForm() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enrollment, setEnrollment] = useState(0);
  const [progress, setProgress] = useState(0);
  const [grades, setGrades] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [studentName, setStudentName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [studentRole, setStudentRole] = useState("student");
  const [teacherRole, setTeacherRole] = useState("teacher");

  const [courseNameError, setCourseNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [gradesError, setGradesError] = useState("");
  const [success, setSuccess] = useState(false);

  const availableCourses = [
    "Mathematics",
    "Science",
    "History",
    "Literature",
    "Art",
  ];

  const availableAssignments = [
    "Assignment 1",
    "Assignment 2",
    "Assignment 3",
    "Assignment 4",
    "Assignment 5",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    setCourseNameError("");
    setDescriptionError("");
    setStartDateError("");
    setEndDateError("");
    setGradesError("");
    setSuccess("");

    if (
      !selectedCourse ||
      !description ||
      !startDate ||
      !endDate ||
      !grades ||
      !studentName ||
      !teacherName
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newCourse = {
      selectedCourse,
      description,
      startDate,
      endDate,
      enrollment,
      progress,
      grades: grades.split(",").map((grade) => grade.trim()),
      assignments,
      students: [{ name: studentName, role: studentRole }],
      teachers: [{ name: teacherName, role: teacherRole }],
    };

    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));

    toast.success("Course created successfully!");
    resetForm();
    navigate("/studentDashboard");
  };

  const resetForm = () => {
    setSelectedCourse("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setEnrollment(0);
    setProgress(0);
    setGrades("");
    setAssignments([]);
    setSelectedAssignment("");
    setStudentName("");
    setTeacherName("");
    setStudentRole("student");
    setTeacherRole("teacher");
  };

  const handleAddAssignment = () => {
    if (selectedAssignment && !assignments.includes(selectedAssignment)) {
      setAssignments([...assignments, selectedAssignment]);
      setSelectedAssignment("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create a New Course</h1>
      {success && <p className="text-green-500">Course created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Student Name:</label>
          <input
            type="text"
            value={studentName}
            placeholder="Please Enter Student Name"
            onChange={(e) => setStudentName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Student Role:</label>
          <select
            value={studentRole}
            onChange={(e) => setStudentRole(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="student">Student</option>
            <option value="teaching_assistant">Teaching Assistant</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Teacher Name:</label>
          <input
            type="text"
            value={teacherName}
            placeholder="Please Enter Teacher Name"
            onChange={(e) => setTeacherName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Teacher Role:</label>
          <select
            value={teacherRole}
            onChange={(e) => setTeacherRole(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="teacher">Teacher</option>
            <option value="assistant_teacher">Assistant Teacher</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Education Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {availableCourses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
          {courseNameError && <p className="text-red-500">{courseNameError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {descriptionError && <p className="text-red-500">{descriptionError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {startDateError && <p className="text-red-500">{startDateError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {endDateError && <p className="text-red-500">{endDateError}</p>}
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
          {gradesError && <p className="text-red-500">{gradesError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assignments:</label>
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select an assignment</option>
            {availableAssignments.map((assignment, index) => (
              <option key={index} value={assignment}>{assignment}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddAssignment}
            className="mt-2 bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-600"
          >
            Add Assignment
          </button>
          <ul className="mt-2">
            {assignments.map((assignment, index) => (
              <li key={index} className="text-gray-700">{assignment}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
