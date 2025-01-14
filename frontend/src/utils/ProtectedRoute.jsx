import { useAuth } from "../store/AuthContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children, requiredRole }) {
  const { auth } = useAuth();

  console.log(auth.isAuthenticated);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && auth.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
}

export default ProtectedRoute;
