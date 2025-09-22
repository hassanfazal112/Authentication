import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isSessionExpired, getAccessToken, clearSession } from "@/lib/auth";

const ProtectedLayout = () => {
  const location = useLocation();
  const token = getAccessToken();
  const expired = isSessionExpired();

  if (!token || expired) {
    clearSession();
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
