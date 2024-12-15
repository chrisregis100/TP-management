import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudentTP from "./pages/StudentTP";
import Home from "./pages/Home";
import TeacherTPManagement from "./pages/TeacherTPManagement";
import { ToastContainer } from "react-toastify";
import TeacherGroups from "./components/teacherDashboard/TeacherGroups";
import TeacherTPs from "./components/teacherDashboard/TeacherTPs";
import TeacherGrading from "./components/teacherDashboard/TeacherGrading";
import TeacherAnalytics from "./components/teacherDashboard/TeacherAnalytics";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/student/tp", element: <StudentTP /> },
    {
      path: "/dashboard/teacher",
      element: <TeacherTPManagement />,
      children: [
        { path: "/dashboard/teacher/groups", element: <TeacherGroups /> },
        { path: "/dashboard/teacher/tps", element: <TeacherTPs /> },
        { path: "/dashboard/teacher/grading", element: <TeacherGrading /> },
        { path: "/dashboard/teacher/analytics", element: <TeacherAnalytics /> },
      ],
    },
  ]);
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
