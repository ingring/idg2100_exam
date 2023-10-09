import {Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ isAllowed, navigateTo="/unauthorized" }) {
  return (
    isAllowed ? (
        <Outlet />
    ) : (
        <Navigate to={navigateTo} replace />

    )
  )
}

export default ProtectedRoutes;