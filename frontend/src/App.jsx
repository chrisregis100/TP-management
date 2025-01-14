import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentTP from "./pages/StudentTP";
import Home from "./pages/Home";
import TeacherTPManagement from "./pages/TeacherDashboard/TeacherTPManagement";
import { ToastContainer } from "react-toastify";
import Verification from "./pages/VerificationPage";
import { AuthProvider } from "./store/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import AcessDenied from "./pages/AcessDenied";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/verification", element: <Verification /> },
    {
      path: "/dashboard/student",
      element: (
        <ProtectedRoute>
          <StudentTP />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/teacher",
      element: <TeacherTPManagement />,
    },
    {
      path: "/unauthorized",
      element: <AcessDenied />,
    },
  ]);
  return (
    <div className="min-h-screen bg-gray-100">
      <AuthProvider>
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
      </AuthProvider>
    </div>
  );
}

export default App;
