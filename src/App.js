import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import Home from "./pages/Home/Home";
import Navbar from "./component/Navbar";
import CourseForm from "./component/CourseForm";
import { ToastContainer } from "react-toastify";
import TeacherDashboard from "./Dashboard/TeacherDashboard";
import StudentDashboard from "./Dashboard/StudentDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import EditCourse from "./component/EditCourse";
import { useState } from "react";
import { AuthProvider } from "./component/form/Authprovider";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthProvider>
      <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
    </AuthProvider>
  );
}

function AppRoutes({ isAuthenticated, onLogin }) {
  const location = useLocation();

  const shouldShowHeader = !["/login", "/registration"].includes(location.pathname);

  return (
    <div className="App">
      {/* <ToastContainer /> */}
      {shouldShowHeader && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={onLogin}/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/courseForm" element={<CourseForm />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/editCourse/:courseIndex" element={<EditCourse />} />
      </Routes>
    </div>
  );
}

export default App;
