import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentTP from "./pages/StudentTP";
import Home from "./pages/Home";
import TeacherTPManagement from "./pages/TeacherTPManagement";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard/student", element: <StudentTP /> },
    {
      path: "/dashboard/teacher",
      element: <TeacherTPManagement />,
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
